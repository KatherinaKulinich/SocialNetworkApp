import { useCallback, useEffect, useState } from "react"
import { FeedFriendship, FeedPhoto, FeedPost } from "types/Feed"
import { UserProfile } from "types/UserProfile"

type AllFeedNews = (FeedPost | FeedPhoto | FeedFriendship)[]
type Role = 'feedPage' | 'interestingPage'
type UsersData = Array<UserProfile> | null
type ContentEvent = 'indexHasChanged' | 'usersDataHasChanged'



export const useFeedUpdates = (index:number, friendsData:UsersData, myId:string, role:Role) => {
    const dayTimeSec = 86400000
    const timeLimit = dayTimeSec*index
    const currentTime = Date.now()
    const timeRange = currentTime - timeLimit

    const [newPosts, setNewPosts] = useState<Array<FeedPost> | null>(null)
    const [newPhotos, setNewPhotos] = useState<Array<FeedPhoto> | null>(null)
    const [newFriendships, setNewFriendships] = useState<Array<FeedFriendship> | null>(null)
    const [allNews, setAllNews] = useState<AllFeedNews | null>(null)

    const [isIdleIndex, setIsIdleIndex] = useState(false)
    const [prevNewsAmountValue, setPrevNewsAmountValue] = useState(0)
    const [prevPhotosAmountValue, setPrevPhotosAmountValue] = useState(0)
    const [prevPostsAmountValue, setPrevPostsAmountValue] = useState(0)
    const [prevFriendshipAmountValue, setPrevFriendshipAmountValue] = useState(0)



    const getLatestPosts = useCallback((event:ContentEvent) => {
        setNewPosts(null)
        if (friendsData) {
            const latestPosts = friendsData?.map(user => {
                const { posts } = user?.content ?? {}
                const filteredPosts = posts?.filter(post => post.date >= timeRange)
                
                const filteredUserPosts = filteredPosts.map(post => {
                    const feedPost = {
                        user,
                        post,
                        date: post.date
                    }
                    return feedPost
                })
                return filteredUserPosts
            })
            const sortedPosts = latestPosts.flat().sort((a:FeedPost, b:FeedPost) => {
                return b.post.date - a.post.date
            })
            if (event === 'indexHasChanged') {
                const prevNewsAmount = newPosts?.length || 0
                setPrevPostsAmountValue(prevNewsAmount)
            }
            if (sortedPosts) {
                setNewPosts(sortedPosts)
            }
        }
    }, [friendsData, index, newPosts])




    const getLatestPhotos = useCallback((event:ContentEvent) => {
        setNewPhotos(null)
        if (friendsData) {
            const latestPhotos = friendsData?.map(user => {
                const { photos } = user?.content ?? {}
                const filteredPhotos = photos?.filter(photo => photo.date >= timeRange)
    
                const filteredUserPhotos = filteredPhotos.map(photo => {
                    const feedPhoto = {
                        user,
                        photo,
                        date: photo.date,
                    }
                    return feedPhoto
                })
                return filteredUserPhotos
            })
            const sortedPhotos = latestPhotos.flat().sort((a:FeedPhoto, b:FeedPhoto) => {
                return b.photo.date - a.photo.date
            })
            if (event === 'indexHasChanged') {
                const prevNewsAmount = newPhotos?.length || 0
                setPrevPhotosAmountValue(prevNewsAmount)
            }
            if (sortedPhotos) {
                setNewPhotos(sortedPhotos)
            }
        }
    }, [friendsData, index, newPhotos])


    
    const getLatestFriendships = useCallback((event:ContentEvent) => {
        if (role === 'feedPage') {
            setNewFriendships(null)
            if (friendsData) {
                const latestFriendships = friendsData?.map(user => {
                    const { friends } = user?.contacts ?? {}
        
                    const filteredUserFriendsUpdates = friends
                    .filter(friend => friend.id !== myId)
                    .filter(friend => friend.date >= timeRange)
        
                    const filteredAllFriendsUpdates = filteredUserFriendsUpdates.map(friend => {
                        const {id, avatar, name, date} = friend
                        const feedFriendItem = {
                            user,
                            friend: {
                                id,
                                name,
                                avatar,
                                date,
                            },
                            date,
                        }
                        return feedFriendItem
                    })
                    return filteredAllFriendsUpdates
                })
                const sortedFriendsUpdates = latestFriendships.flat().sort((a:FeedFriendship, b:FeedFriendship) => {
                    return b.friend.date - a.friend.date
                })
                if (event === 'indexHasChanged') {
                    const prevNewsAmount = newFriendships?.length || 0
                    setPrevFriendshipAmountValue(prevNewsAmount)
                }
                if (sortedFriendsUpdates) {
                    setNewFriendships(sortedFriendsUpdates)
                }
            }
            return
        }
        setNewFriendships([])
    }, [friendsData, index, newFriendships])

 

    const getAllLatestUpdates = useCallback((photos: Array<FeedPhoto>, posts: Array<FeedPost>, friendship: Array<FeedFriendship>) => {
        const all:AllFeedNews = [...photos, ...posts, ...friendship]

        const sortedNews = all.sort((a, b) => {
            return b.date - a.date
        })
        if (sortedNews?.length > 0) {
            setAllNews(sortedNews)
        }
    }, [friendsData])



    const getLatestContent = useCallback((event:ContentEvent) => {
        getLatestPhotos(event)
        getLatestPosts(event)
        getLatestFriendships(event)
    }, [friendsData, index])


    useEffect(() => {
        if (friendsData) {
            getLatestContent('usersDataHasChanged')
        }
    }, [friendsData])
    
    useEffect(() => {
        getLatestContent('indexHasChanged') 
    }, [index])
    


    useEffect(() => {
        if (newPhotos && newPosts && newFriendships) {
            getAllLatestUpdates(newPhotos, newPosts, newFriendships)
        }
    }, [newPhotos, newPosts, newFriendships])

    useEffect(() => {
        const all = prevFriendshipAmountValue+prevPhotosAmountValue+prevPostsAmountValue
        setPrevNewsAmountValue(all)  
    }, [allNews])


    useEffect(() => {
        if (prevNewsAmountValue === allNews?.length) {
            setIsIdleIndex(true)
            return
        }
        setIsIdleIndex(false)
    }, [prevNewsAmountValue ])




    return {
        newPosts,
        newPhotos,
        newFriendships,
        allNews,
        isIdleIndex
    }
}
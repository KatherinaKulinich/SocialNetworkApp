import { useAppDispatch, useAppSelector } from "hooks/hooks"
import { useMyFullData } from "hooks/useMyFullData"
import { fetchFriends } from "rdx/slices/friendsSlice"
import { useCallback, useEffect, useState } from "react"
import { FeedFriendship, FeedPhoto, FeedPost } from "types/Feed"
import { UserProfile } from "types/UserProfile"

type AllFeedNews = (FeedPost | FeedPhoto | FeedFriendship)[]
type Role = 'feedPage' | 'interestingPage'


export const useFeedUpdates = (index:number, friendsData:UserProfile[], myId:string, role:Role) => {
    const dayTimeSec = 86400000
    const timeLimit = dayTimeSec*index
    const currentTime = Date.now()
    const timeRange = currentTime - timeLimit

    const [newPosts, setNewPosts] = useState<FeedPost[]>([])
    const [newPhotos, setNewPhotos] = useState<FeedPhoto[]>([])
    const [newFriendships, setNewFriendships] = useState<FeedFriendship[]>([])
    const [allNews, setAllNews] = useState<AllFeedNews>([])



    const getLatestPosts = useCallback(() => {
       
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
        setNewPosts(sortedPosts)
        // return sortedPosts
    }, [newPosts])




    const getLatestPhotos = useCallback(() => {
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
        // console.log(sortedPhotos);
        
        setNewPhotos(sortedPhotos)
        // return sortedPhotos
    }, [newPhotos])


    
    const getLatestFriendships = useCallback(() => {
        if (role === 'feedPage') {
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
            setNewFriendships(sortedFriendsUpdates)
            return
            // return sortedFriendsUpdates
        }
        setNewFriendships([])
        // return [] as FeedFriendship[]
    }, [newFriendships])

 

    // const [newPosts, setNewPosts] = useState<FeedPost[]>([])
    // const [newPhotos, setNewPhotos] = useState<FeedPhoto[]>([])
    // const [newFriendships, setNewFriendships] = useState<FeedFriendship[]>([])
    // const [allNews, setAllNews] = useState<AllFeedNews>([])

    // useEffect(() => {
    //     console.log('useEffect', index);
        
    //     setNewPhotos(getLatestPhotos())
    //     setNewPosts(getLatestPosts())
    //     setNewFriendships(getLatestFriendships())
    // }, [index])

    // useEffect(() => {
    //     console.log('useEffectSTART', index);
        
    //     setNewPhotos(getLatestPhotos())
    //     setNewPosts(getLatestPosts())
    //     setNewFriendships(getLatestFriendships())
    // }, [])



    // const getAllLatestUpdates = useCallback(() => {
    //     console.log('photos',newPhotos);
        
    //     if (newPhotos && newPosts && newFriendships) {
    //         console.log('photos!!!',newPhotos);
    //         const allNews:AllFeedNews = [...newPosts, ...newPhotos, ...newFriendships]
    
    //         const sortedNews = allNews.sort((a, b) => {
    //             return b.date - a.date
    //         })
    //         console.log('SORTED ALL', sortedNews);
            
    //         setAllNews(sortedNews)
    //         return

    //         // return sortedNews
    //     }
    //     setAllNews([])
    //     // return [] as AllFeedNews
    // }, [newPhotos, newFriendships, newPosts, allNews])


    // const getNews = useCallback(() => {

    //     getLatestPhotos()
    //     getLatestPosts()
    //     getLatestFriendships()
    // }, [index])

    useEffect(() => {
        getLatestPhotos()
        getLatestPosts()
        getLatestFriendships()
    }, [index, friendsData])

    // useEffect(() => {
    //     getAllLatestUpdates()
      
    // },[newPhotos, newFriendships, newPosts, index])








    // useEffect(() => {
    //     setAllNews(getAllLatestUpdates())
    // }, [newFriendships, newPhotos, newPosts])



    


    return {
        newPosts,
        newPhotos,
        newFriendships,
        allNews,
        // isLoading
    }
}
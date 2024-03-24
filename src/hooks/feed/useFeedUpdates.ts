import { useCallback, useEffect, useState } from "react"
import { FeedFriendship, FeedPhoto, FeedPost } from "types/Feed"
import { UserProfile } from "types/UserProfile"

type AllFeedNews = (FeedPost | FeedPhoto | FeedFriendship)[]
type Role = 'feedPage' | 'interestingPage'
type UsersData = Array<UserProfile> | null
type ContentEvent = 'indexHasChanged' | 'usersDataHasChanged'



export const useFeedUpdates = (index:number, friendsData:UsersData, myData:UserProfile, role:Role, usersAmount:number) => {
    const myId = myData?.personalData?.userId;
   
    const [newPosts, setNewPosts] = useState<Array<FeedPost> | null>(null)
    const [newPhotos, setNewPhotos] = useState<Array<FeedPhoto> | null>(null)
    const [newFriendships, setNewFriendships] = useState<Array<FeedFriendship> | null>(null)
    const [allNews, setAllNews] = useState<AllFeedNews>([])

    const [isIdleIndex, setIsIdleIndex] = useState(false)
    const [isNoUsersData, setIsNoUsersData] = useState<boolean>(false)
    const [isNoFreshLatestNews, setIsNoFreshLatestNews] = useState<boolean>(false)


    const getLatestPosts = useCallback(async (limit:number, users:UserProfile[]) => {
        const latestPosts = users?.map(user => {
            const { posts } = user?.content ?? {}
            const filteredPosts = posts?.filter(post => post.date >= limit)

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
        const sortedPosts:FeedPost[] = latestPosts.flat().sort((a:FeedPost, b:FeedPost) => {
            return b.post.date - a.post.date
        })
        return sortedPosts
    }, [])




    const getLatestPhotos = useCallback(async (limit:number, users:UserProfile[]) => {
        const latestPhotos = users?.map(user => {
            const { photos } = user?.content ?? {}
            const filteredPhotos = photos?.filter(photo => photo.date >= limit)

            const filteredUserPhotos = filteredPhotos.map(photo => {
                const feedPhoto:FeedPhoto = {
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
        return sortedPhotos 
    }, [])


    
    const getLatestFriendships = useCallback(async (limit:number, users:UserProfile[]) => {
        if (role === 'feedPage') {
            const latestFriendships = users.map(user => {
                const { friends } = user?.contacts ?? {}
    
                const filteredUserFriendsUpdates = friends
                .filter(friend => friend.id !== myId)
                .filter(friend => friend.date >= limit)
    
                const filteredAllFriendsUpdates = filteredUserFriendsUpdates.map(friend => {
                    const {id, avatar, name, date} = friend
                    const feedFriendItem:FeedFriendship = {
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
            return sortedFriendsUpdates
        }
        setNewFriendships([])
        return []
    }, [])

 

    const getAllLatestUpdates = useCallback(async (photos: Array<FeedPhoto>, posts: Array<FeedPost>, friendship: Array<FeedFriendship>) => {
        if (friendsData && friendsData?.length === usersAmount) {
            const all:AllFeedNews = [...photos, ...posts, ...friendship]

            const sortedNews = all.sort((a, b) => {
                return b.date - a.date
            })
            if (sortedNews?.length > 0) {
                return sortedNews
            }
            return []
        }
    }, [friendsData, index])

    


    const getLatestContent = useCallback(async(indexValue:number, contentEvent: ContentEvent) => {
        setIsIdleIndex(false)
        const currentDay = Date.now()
        const dayTimeSec = 86400000
        const timeRange = dayTimeSec*indexValue
        const timeLimitEnd = currentDay-timeRange

        if (friendsData && friendsData?.length > 0 && friendsData?.length === usersAmount) {
            setIsNoUsersData(false)

            const filteredPhotos = await getLatestPhotos(timeLimitEnd, friendsData)
            const filteredPosts = await getLatestPosts(timeLimitEnd, friendsData)
            const filteredFriendship = await getLatestFriendships(timeLimitEnd, friendsData)
    
            if (filteredPhotos && filteredPosts  && filteredFriendship) {
                setNewFriendships(filteredFriendship)
                setNewPhotos(filteredPhotos)
                setNewPosts(filteredPosts)
    
                const news = await getAllLatestUpdates(filteredPhotos, filteredPosts , filteredFriendship)
                
                if (news) {
                    getNewsResult(news, contentEvent, indexValue)
                }
            }
        } 
    }, [friendsData, allNews])


    const getNewsResult = useCallback((news: AllFeedNews, contentEvent: ContentEvent, indexValue: number) => {
        if (news?.length > 0) {
            if (contentEvent === 'indexHasChanged') {
                if (news.length === allNews.length) {
                    setIsIdleIndex(true)
                    return
                }
                setIsIdleIndex(false)
                setAllNews(news)
                return
            }
            setIsIdleIndex(false)
            setAllNews(news)
            return
        } else if (news?.length === 0) {
            if (indexValue <= 6) {
                setIsIdleIndex(true)
                return
            }
            setIsNoFreshLatestNews(true)
        }
    }, [allNews, friendsData])




    useEffect(() => {
        if (friendsData && friendsData?.length > 0) {
            setIsNoUsersData(false)
            return
        } else if (role === 'feedPage' && usersAmount === 0) {
            setIsNoUsersData(true)
        }
    }, [friendsData, usersAmount, role])




    useEffect(() => {
        getLatestContent(index, 'usersDataHasChanged')
    }, [friendsData])
    

    useEffect(() => {
        getLatestContent(index, 'indexHasChanged')
    }, [index])




    return {
        newPosts,
        newPhotos,
        newFriendships,
        allNews,
        isIdleIndex,
        isNoUsersData,
        isNoFreshLatestNews
    }
}
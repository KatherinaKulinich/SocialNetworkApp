import { useCallback, useEffect, useState } from "react"
import { IoIosReturnLeft } from "react-icons/Io"
import { FeedFriendship, FeedPhoto, FeedPost } from "types/Feed"
import { UserProfile } from "types/UserProfile"

type AllFeedNews = (FeedPost | FeedPhoto | FeedFriendship)[]
type Role = 'feedPage' | 'interestingPage'
type UsersData = Array<UserProfile> | null
type ContentEvent = 'indexHasChanged' | 'usersDataHasChanged'



export const useFeedUpdates = (index:number, friendsData:UsersData, myData:UserProfile, role:Role, usersAmount:number) => {
    const myId = myData?.personalData?.userId;
   
    // const usersAmount = friends?.length+followingList?.length
    

    const [newPosts, setNewPosts] = useState<Array<FeedPost> | null>(null)
    const [newPhotos, setNewPhotos] = useState<Array<FeedPhoto> | null>(null)
    const [newFriendships, setNewFriendships] = useState<Array<FeedFriendship> | null>(null)
    const [allNews, setAllNews] = useState<AllFeedNews>([])

    const [isIdleIndex, setIsIdleIndex] = useState(false)
    const [isNoUsersData, setIsNoUsersData] = useState<boolean>(false)


//start:number, end:number

    const getLatestPosts = useCallback(async (limit:number, users:UserProfile[]) => {
        const latestPosts = users?.map(user => {
            const { posts } = user?.content ?? {}
            const filteredPosts = posts?.filter(post => post.date >= limit)
            // const filteredPosts = posts?.filter(post => post.date >= end && post.date <= start)

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
        // setNewPosts(sortedPosts)
        return sortedPosts

        // if (friendsData && friendsData?.length === usersAmount) {
        // } 
        // if (sortedPosts) {
        //     if (newPosts === null) {
        //         setNewPosts(sortedPosts)
        //         return sortedPosts
        //     }
        //     const updated = [...newPosts, ...sortedPosts]
        //     setNewPosts(updated)
        //     return sortedPosts
        // }
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
        // setNewPhotos(sortedPhotos)
        return sortedPhotos
        // if (friendsData && friendsData?.length === usersAmount)  {
        //     // console.log('sorted____', sortedPhotos);
            
        //     // if (sortedPhotos) {
        //     //     if (newPhotos === null) {
        //     //         setNewPhotos(sortedPhotos)
        //     //         return sortedPhotos
        //     //     }          
        //     //     const updated = [...newPhotos, ...sortedPhotos]
        //     //     setNewPhotos(updated)
        //     //     return sortedPhotos
        //     // }
        // } 
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
            // setNewFriendships(sortedFriendsUpdates)
            return sortedFriendsUpdates
            // if (friendsData && friendsData?.length === usersAmount) {
            //     // if (sortedFriendsUpdates) {
            //     //     if (newFriendships === null) {
            //     //         setNewFriendships(sortedFriendsUpdates)
            //     //         return sortedFriendsUpdates
            //     //     }
            //     //     const updated = [...newFriendships, ...sortedFriendsUpdates]
            //     //     setNewFriendships(updated)
            //     //     return sortedFriendsUpdates
            //     // }
            // } 
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

    

    const getLatestContent = useCallback(async(indexValue:number) => {
        setIsIdleIndex(false)
        const currentDay = Date.now()
        const dayTimeSec = 86400000
        const timeRange = dayTimeSec*indexValue
        const timeLimitEnd = currentDay-timeRange
        // const dateStart = Date.now()-dayTimeSec*indexValue
        // const dateEnd = dateStart-dayTimeSec


        if (friendsData && friendsData?.length > 0 && friendsData?.length === usersAmount) {
            setIsNoUsersData(false)

            const filteredPhotos = await getLatestPhotos(timeLimitEnd, friendsData)
            const filteredPosts = await getLatestPosts(timeLimitEnd, friendsData)
            const filteredFriendship = await getLatestFriendships(timeLimitEnd, friendsData)
    
            
            if (filteredPhotos && filteredPosts  && filteredFriendship) {
                setNewFriendships(filteredFriendship)
                setNewPhotos(filteredPhotos)
                setNewPosts(filteredPosts)
    
                await getAllLatestUpdates(filteredPhotos, filteredPosts , filteredFriendship)
                .then((news) => {
                    console.log('_____news before SETALLNEWS___', news);
                    if (news) {
                        if (news?.length > 0) {
                            //if news.length === 0 ----> idleIndex === true ?
                            setAllNews(news)
                            setIsIdleIndex(false)
                        } else if (news.length === 0) {
                            setIsIdleIndex(true)
                        }
                    }
                })
            }
        } 

        // else if (friendsData?.length === 0 && allNews?.length === 0 ) {
        //     setTimeout(() => {    
        //         if (friendsData?.length === 0 && allNews?.length === 0)  {
        //             console.log('friendsData', friendsData);
                    
        //             setIsNoUsersData(true)
        //             return
        //         }   
        //         setIsNoUsersData(false)
                
        //     }, 3500);
        // }


        
        // if (dayPhotos && dayPosts && dayFriendship) {
        //     const allDayNews = [...dayPhotos, ...dayPosts, ...dayFriendship]
        //     return allDayNews
        // }
        // return null
    }, [friendsData])

    useEffect(() => {
        if (friendsData && friendsData?.length > 0) {
            setIsNoUsersData(false)
            return
        }
        setIsNoUsersData(true)
    }, [friendsData])




    useEffect(() => {
        
        getLatestContent(index)
    }, [friendsData])
    

    useEffect(() => {
        getLatestContent(index)
    }, [index])


    // useEffect(() => {
    //     if (newPhotos && newPosts && newFriendships) {
    //         getAllLatestUpdates(newPhotos, newPosts, newFriendships)
    //         .then((news) => {
    //             if (news) {
    //                 if (news?.length > 0) {
    //                     setAllNews(news)
    //                 } else if (news?.length === 0) {
    //                     setAllNews([])
    //                 }
    //             }
    //         })
    //     }
    // }, [newPhotos, newPosts, newFriendships])

    // useEffect(() => {
    //     console.log('____ALL__NEWS_____', allNews);
        
    // }, [allNews])




    return {
        newPosts,
        newPhotos,
        newFriendships,
        allNews,
        isIdleIndex,
        isNoUsersData,
    }
}
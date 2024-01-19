import { useAppDispatch, useAppSelector } from "hooks/hooks"
import { useMyFullData } from "hooks/useMyFullData"
import { fetchFriends } from "rdx/slices/friendsSlice"
import { useCallback, useEffect, useState } from "react"
import { FeedFriendship, FeedPhoto, FeedPost } from "types/Feed"
import { UserProfile } from "types/UserProfile"

type AllFeedNews = (FeedPost | FeedPhoto | FeedFriendship)[]


export const useFeedUpdates = (index:number, usersData:UserProfile[], myId:string) => {
    const dayTimeSec = 86400000
    const timeLimit = dayTimeSec*index
    const currentTime = Date.now()
    const timeRange = currentTime - timeLimit



    const getLatestPosts = useCallback(() => {
        const latestPosts = usersData?.map(user => {
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
        return sortedPosts
    }, [usersData])



    const getLatestPhotos = useCallback(() => {
        const latestPhotos = usersData?.map(user => {
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
        return sortedPhotos
    }, [usersData])


    
    const getLatestFriendships = useCallback(() => {
        const latestFriendships = usersData?.map(user => {
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
        return sortedFriendsUpdates
    }, [usersData])



    const [newPosts, setNewPosts] = useState<FeedPost[]>(getLatestPosts())
    const [newPhotos, setNewPhotos] = useState<FeedPhoto[]>(getLatestPhotos())
    const [newFriendships, setNewFriendships] = useState<FeedFriendship[]>(getLatestFriendships())





    const getAllLatestUpdates = useCallback(() => {
        if (newPhotos && newPosts && newFriendships) {
            const allNews:AllFeedNews = [...newPosts, ...newPhotos, ...newFriendships]
    
            const sortedNews = allNews.sort((a, b) => {
                return b.date - a.date
            })
            return sortedNews
        }
        return [] as AllFeedNews
    }, [newPhotos,newPosts,newFriendships])

    const [allNews, setAllNews] = useState<AllFeedNews>([])
    useEffect(() => {
        setAllNews(getAllLatestUpdates())
    }, [newPhotos,newPosts,newFriendships])



    


    return {
        newPosts,
        newPhotos,
        newFriendships,
        allNews
    }
}
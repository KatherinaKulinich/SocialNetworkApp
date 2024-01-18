import { useAppDispatch, useAppSelector } from "hooks/hooks"
import { useMyFullData } from "hooks/useMyFullData"
import { fetchFriends } from "rdx/slices/friendsSlice"
import { useCallback, useEffect, useState } from "react"
import { FeedFriendship, FeedPhoto, FeedPost } from "types/Feed"

type AllFeedNews = (FeedPost | FeedPhoto | FeedFriendship)[]


export const useFeedUpdates = (index:number) => {
    const myData = useMyFullData()
    const dispatch = useAppDispatch()

    const { friends, followers } = myData?.contacts ?? {}
    const { userId:myId } = myData?.personalData ?? {}
    const friendsIds = friends?.map(friend => friend.id) || []

    useEffect(() => {
        dispatch(fetchFriends(friendsIds, 'friends'))
        dispatch(fetchFriends(followers, 'followers'))
    }, [dispatch, myData])

    const friendsData = useAppSelector(state => state.friends.friendsData)
    const followersData = useAppSelector(state => state.friends.followersData)
    const allUsers = friendsData.concat(followersData)




    const [newPosts, setNewPosts] = useState<FeedPost[]>()
    const [newPhotos, setNewPhotos] = useState<FeedPhoto[]>()
    const [newFriendships, setNewFriendships] = useState<FeedFriendship[]>()
    const [allNews, setAllNews] = useState<AllFeedNews>()


    const dayTimeSec = 86400000
    const timeLimit = dayTimeSec*index
    const currentTime = Date.now()
    const timeRange = currentTime - timeLimit


    const getLatestPosts = useCallback(() => {
        const latestPosts = allUsers.map(user => {
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
    }, [])



    const getLatestPhotos = useCallback(() => {
        const latestPhotos = allUsers.map(user => {
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
        setNewPhotos(sortedPhotos)
    }, [])


    
    const getLatestFriendships = useCallback(() => {
        const latestFriendships = allUsers.map(user => {
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
                    date: friend.date,
                }
                return feedFriendItem
            })
            return filteredAllFriendsUpdates
        })

        const sortedFriendsUpdates = latestFriendships.flat().sort((a:FeedFriendship, b:FeedFriendship) => {
            return b.friend.date - a.friend.date
        })
        setNewFriendships(sortedFriendsUpdates)
    }, [])
    


    useEffect(() => {
        getLatestPosts()
        getLatestPhotos()
        getLatestFriendships()
    }, [])


    const getAllLatestUpdates = useCallback(() => {
        if (newPhotos && newPosts && newFriendships) {
            const allNews:AllFeedNews = [...newPosts, ...newPhotos, ...newFriendships]

            const sortedNews = allNews.sort((a, b) => {
                return b.date - a.date
            })

            setAllNews(sortedNews)
        }
    }, [])

    useEffect(() => {
        getAllLatestUpdates()
    }, [])



    return {
        newPosts,
        newPhotos,
        newFriendships,
        allNews
    }
}
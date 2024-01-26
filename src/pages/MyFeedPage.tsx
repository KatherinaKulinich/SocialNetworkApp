import img from '@images/myFeed.svg'
import imageNoNews from '@images/nofriends.svg'
import { useEffect, useCallback } from "react"
import { useAppDispatch, useAppSelector } from 'hooks/hooks'
import { useMyFullData } from 'hooks/useMyFullData'
import { fetchFriends } from 'rdx/slices/friendsSlice'
import { FeedContainer } from '@components/containers/FeedContainer/FeedContainer'





export const MyFeedPage: React.FC = () => {
    const dispatch = useAppDispatch()

    const myData = useMyFullData()
    const { userId } = myData?.personalData ?? {}

    const { friends, followers } = myData?.contacts ?? {}
    const friendsIds = friends?.map(friend => friend.id) || []

    useEffect(() => {
        dispatch(fetchFriends(friendsIds, 'friends'))
        dispatch(fetchFriends(followers, 'followers'))
    }, [dispatch, myData])

    const friendsData = useAppSelector(state => state.friends.friendsData)
    const followersData = useAppSelector(state => state.friends.followersData)
    const allUsers = friendsData.concat(followersData)


    return (
        <FeedContainer 
            users={allUsers} 
            role={"feedPage"} 
            myId={userId}            
        />
    )
}
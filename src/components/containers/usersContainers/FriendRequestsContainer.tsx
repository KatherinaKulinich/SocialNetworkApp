import imgNoUsers from '@images/noRequests.svg'
import { RequestCard } from "@components/cards/userCards/RequestCard"
import { useAppDispatch, useAppSelector } from "hooks/hooks"
import { fetchFriends } from "rdx/slices/friendsSlice"
import { useEffect, useState } from "react"
import { UsersContainer } from './components/UsersContainer';
import { UserProfile } from 'types/UserProfile'




export const FriendRequestsContainer:React.FC = () => {
    const dispatch = useAppDispatch()
    const myData = useAppSelector(state => state.userData.user)
    const requestsIds = myData?.contacts?.friendRequests

    useEffect(() => {
        if (myData) {
            dispatch(fetchFriends(requestsIds, 'friendRequests'))
        }
    }, [dispatch, myData])

    const friendRequestsUsersData = useAppSelector(state => state.friends.friendRequestsData)

    const [followingOnPage, setFollowingOnPage] = useState<Array<UserProfile> | null>(null)

    useEffect(() => {
        if (friendRequestsUsersData  && friendRequestsUsersData?.length === requestsIds?.length) {
            setFollowingOnPage(friendRequestsUsersData)
        }
    }, [friendRequestsUsersData])


    return (
        <UsersContainer 
            usersData={friendRequestsUsersData} 
            usersCards={
                followingOnPage && followingOnPage?.map(friend => (
                    <RequestCard 
                        key={friend.personalData.userId}
                        user={friend}
                    />
                ))
            } 
            imageNoUsersPath={imgNoUsers} 
            imageText={"No one has sent you a friend request"}
            subtitleText="These users would like to be your friend"
        />
    )
}

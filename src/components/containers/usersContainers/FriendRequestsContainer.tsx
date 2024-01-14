import imgNoUsers from '@images/nousers.svg'
import { RequestCard } from "@components/cards/userCards/RequestCard"
import { useAppDispatch, useAppSelector } from "hooks/hooks"
import { fetchFriends } from "rdx/slices/friendsSlice"
import { useEffect } from "react"
import { UsersContainer } from './components/usersContainer';
import { useMyFullData } from 'hooks/useMyFullData';




export const FriendRequestsContainer:React.FC = () => {
    const dispatch = useAppDispatch()
    const userData = useMyFullData()

    useEffect(() => {
        if (userData) {
            dispatch(fetchFriends(userData.contacts.friendRequests, 'friendRequests'))
        }
    }, [userData])

    const friendRequestsUsersData = useAppSelector(state => state.friends.friendRequestsData)


    return (
        <UsersContainer 
            usersData={friendRequestsUsersData} 
            usersCards={
                friendRequestsUsersData.map(friend => (
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

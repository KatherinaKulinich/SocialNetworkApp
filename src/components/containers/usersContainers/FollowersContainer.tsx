import imgNoUsers from '@images/nofriends.svg'
import { useAppDispatch, useAppSelector } from "hooks/hooks"
import { fetchFriends } from "rdx/slices/friendsSlice"
import { useEffect } from "react"
import { FriendCard } from "@components/cards/userCards/FriendCard"
import { UsersContainer } from './components/usersContainer';
import { useMyFullData } from 'hooks/useMyFullData';




export const FollowersContainer:React.FC = () => {
    const dispatch = useAppDispatch()
    const userData = useMyFullData()

    useEffect(() => {
        if (userData) {
            dispatch(fetchFriends(userData.contacts.followers, 'followers'))
        }
    }, [userData])

    const followersData = useAppSelector(state => state.friends.followersData)


    return (
        <UsersContainer 
            usersData={followersData} 
            usersCards={
                followersData.map(user => (
                    <FriendCard 
                        key={user.personalData.userId}
                        user={user}
                    />
                ))
            } 
            imageNoUsersPath={imgNoUsers} 
            imageText={"You don't have any followers yet"}
            subtitleText="These users follow you"
        />
    )
}
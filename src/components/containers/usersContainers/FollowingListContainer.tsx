import imgNoUsers from '@images/nofriends.svg'
import { FollowingCard } from "@components/cards/userCards/FollowingCard";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { fetchFriends } from "rdx/slices/friendsSlice";
import { useEffect } from "react";
import { UsersContainer } from "./components/UsersContainer";
import { useMyFullData } from "hooks/useMyFullData";



export const FollowingListContainer:React.FC = () => {
    const dispatch = useAppDispatch()
    const userData = useMyFullData()

    useEffect(() => {
        if (userData) {
            dispatch(fetchFriends(userData.contacts.followingList, 'followingList'))
        }
    }, [userData])

    const followingListUsersData = useAppSelector(state => state.friends.followingListData)


    return (
        <UsersContainer 
            usersData={followingListUsersData } 
            usersCards={
               followingListUsersData.map(user => (
                    <FollowingCard 
                        key={user.personalData.userId}
                        user={user}
                    />
                ))
            } 
            imageNoUsersPath={imgNoUsers} 
            imageText={"You don't follow any users yet"}
            subtitleText="You have sent a friend request to these users and you follow them"
        />
    )
}
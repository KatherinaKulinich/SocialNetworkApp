import imgNoUsers from '@images/noFollowingList.svg'
import { FollowingCard } from "@components/cards/userCards/FollowingCard";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { fetchFriends } from "rdx/slices/friendsSlice";
import { useEffect, useState } from "react";
import { UsersContainer } from "./components/UsersContainer";
import { useMyFullData } from "hooks/useMyFullData";
import { UserProfile } from 'types/UserProfile';



export const FollowingListContainer:React.FC = () => {
    const dispatch = useAppDispatch()
    const userData = useMyFullData()
    const followingIds = userData?.contacts?.followingList

    useEffect(() => {
        if (userData) {
            dispatch(fetchFriends(followingIds, 'followingList'))
        }
    }, [dispatch, userData])

    const followingListUsersData = useAppSelector(state => state.friends.followingListData)

    const [followingOnPage, setFollowingOnPage] = useState<Array<UserProfile> | null>(null)

    useEffect(() => {
        if (followingListUsersData  && followingListUsersData?.length === followingIds?.length) {
            setFollowingOnPage(followingListUsersData)
        }
    }, [followingListUsersData])

    return (
        <UsersContainer 
            usersData={followingListUsersData } 
            usersCards={
                followingOnPage && followingOnPage?.map(user => (
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
import imgNoUsers from '@images/noFollowers.svg'
import { useAppDispatch, useAppSelector } from "hooks/hooks"
import { fetchFriends } from "rdx/slices/friendsSlice"
import { useEffect, useState } from "react"
import { FriendCard } from "@components/cards/userCards/FriendCard"
import { UsersContainer } from './components/UsersContainer';
import { UserProfile } from 'types/UserProfile'





export const FollowersContainer:React.FC = () => {
    const dispatch = useAppDispatch()
    const myData = useAppSelector(state => state.userData.user)
    const followers = myData?.contacts?.followers

    useEffect(() => {
        if (myData) {
            dispatch(fetchFriends(followers, 'followers'))
        }
    }, [dispatch, myData])

    const followersData = useAppSelector(state => state.friends.followersData)
    const [followersOnPage, setFollowersOnPage] = useState<Array<UserProfile> | null>(null)

    useEffect(() => {
        if (followersData  && followersData?.length === followers?.length) {
            setFollowersOnPage(followersData)
        }
    }, [followersData])


    return (
        <UsersContainer 
            usersData={followersData} 
            usersCards={
                followersOnPage && followersOnPage?.map(user => (
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
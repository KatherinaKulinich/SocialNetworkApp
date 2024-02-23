import img from '@images/myFeed.svg'
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from 'hooks/hooks'
import { useMyFullData } from 'hooks/useMyFullData'
import { fetchFriends } from 'rdx/slices/friendsSlice'
import { FeedContainer } from '@components/containers/FeedContainer/FeedContainer'
import { PageContainer } from '@components/containers/PageContainer/PageContainer'
import { PageImgTitle } from '@components/PageImgTitle/PageImgTitle'
import { SubTitle } from '@components/text/Subtitle'
import { UserProfile } from 'types/UserProfile'





export const MyFeedPage: React.FC = () => {
    const dispatch = useAppDispatch()

    const myData = useMyFullData()
    const { userId } = myData?.personalData ?? {}

    const { friends, followingList } = myData?.contacts ?? {}
    const friendsIds = friends?.map(friend => friend.id) || []


    useEffect(() => {
        dispatch(fetchFriends(friendsIds, 'friends'))
        dispatch(fetchFriends(followingList, 'followingList'))
    }, [])

    const usersFriends = useAppSelector(state => state.friends.friendsData)
    const usersFollowing = useAppSelector(state => state.friends.followingListData)

    const [friendsUsersData, setFriendsUsersData] = useState<Array<UserProfile> | null>(null)
    const [followingUsersData, setFollowingUsersData] = useState<Array<UserProfile> | null>(null)
    const [users, setUsers] = useState<Array<UserProfile> | null>(null)


    useEffect(() => {
        if (usersFriends) {
            if (usersFriends.length > 0) {
                setFriendsUsersData(usersFriends)
                return
            }
            setFriendsUsersData([] as Array<UserProfile>)
        }
    }, [usersFriends])

    useEffect(() => {
        if (usersFollowing) {
            if (usersFollowing.length > 0) {
                setFollowingUsersData(usersFollowing)
                return
            }
            setFollowingUsersData([] as Array<UserProfile>)
        }
    }, [usersFollowing])


    useEffect(() => {
        if (friendsUsersData && followingUsersData) {
            const allUsers = friendsUsersData.concat(followingUsersData)
            if (allUsers.length > 0) {
                setUsers(allUsers)
            }
        }
    }, [friendsUsersData, followingUsersData])




    return (
        <PageContainer>
            <PageImgTitle 
                image={img} 
                titleFirst='My'
                titleSecond="feed"
            />
            <SubTitle text={'The latest news from your friends and followers:'} />
            <FeedContainer 
                users={users} 
                role={"feedPage"} 
                myId={userId}       
            />
        </PageContainer>
    )
}
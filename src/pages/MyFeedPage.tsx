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

    const friendsData = useAppSelector(state => state.friends.friendsData)
    const followingData = useAppSelector(state => state.friends.followingListData)

    const [users, setUsers] = useState<Array<UserProfile>>([])

    useEffect(() => {
        if (friendsData?.length > 0 || followingData?.length > 0) {
            const allUsers = friendsData.concat(followingData)
            setUsers(allUsers)
        }
    }, [friendsData, followingData])


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
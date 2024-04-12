import img from '@images/myRequests.svg'
import { PageImgTitle } from "@components/PageImgTitle/PageImgTitle"
import { PageContainer } from "@components/containers/PageContainer/PageContainer"
import { TwoTabsContainer } from '@components/tabs/TwoTabsContainer';
import { FollowingListContainer } from '@components/containers/usersContainers/FollowingListContainer';
import { FriendRequestsContainer } from '@components/containers/usersContainers/FriendRequestsContainer';
import { useAuth } from 'hooks/authorization/useAuth';
import { useAppDispatch } from 'hooks/hooks';
import { fetchUserFullData } from 'rdx/slices/userDataSlice';
import { useEffect } from 'react';






export const MyRequestsAndFollowingPage: React.FC = () => {
    const dispatch = useAppDispatch()
    const { userId } = useAuth()

    useEffect(() => {
        if (userId) {
            dispatch(fetchUserFullData(userId))
        }
    }, [])

    return (
        <PageContainer>
            <PageImgTitle 
                image={img} 
                titleFirst='My friend requests'
                titleSecond="and following list"
            />
           
            <TwoTabsContainer 
                firstTabName={'Friend requests'} 
                secondTabName={'Following list'} 
                firstTabContent={
                    <FriendRequestsContainer/>
                } 
                secondTabContent={
                    <FollowingListContainer/>
                }
            />
        </PageContainer>
    )
}
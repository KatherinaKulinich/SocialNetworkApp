import img from '@images/myRequests.svg'
import { PageImgTitle } from "@components/PageImgTitle/PageImgTitle"
import { PageContainer } from "@components/containers/PageContainer/PageContainer"
import { TwoTabsContainer } from '@components/tabs/TwoTabsContainer';
import { FollowingListContainer } from '@components/containers/usersContainers/FollowingListContainer';
import { FriendRequestsContainer } from '@components/containers/usersContainers/FriendRequestsContainer';






export const MyRequestsAndFollowingPage: React.FC = () => {

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
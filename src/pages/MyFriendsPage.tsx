import img from '@images/friends2.svg'
import { PageImgTitle } from '@components/PageImgTitle/PageImgTitle'
import { PageContainer } from '@components/containers/PageContainer/PageContainer';
import { useUserData } from 'hooks/useUserData';
import { FriendsContainer } from '@components/containers/FriendsContainer/FriendsContainer';





export const MyFriendsPage:React.FC = () => {
    const {userData} = useUserData()


    return (
        <PageContainer>
            <PageImgTitle 
                image={img} 
                titleFirst='My'
                titleSecond='friends'
            />
            <FriendsContainer
                role='myFriends' 
                user={userData}           
            />
        </PageContainer>
    )
}
import img from '@images/friendFriends.svg';
import { useAppSelector } from "hooks/hooks";
import { PageImgTitle } from "@components/PageImgTitle/PageImgTitle"
import { PageContainer } from "@components/containers/PageContainer/PageContainer"
import { FriendsContainer } from "@components/containers/FriendsContainer/FriendsContainer";





export const UserFriendsPage:React.FC = () => {
    const user = useAppSelector(state => state.friends.selectedUser)
    const name = user.userName;


    return (
        <PageContainer>
            <PageImgTitle 
                image={img} 
                titleFirst={`${name}'s`}
                titleSecond='friends'
            />
            <FriendsContainer
                role='userFriends' 
                user={user}           
            />
        </PageContainer>
    )
}
import { PageImgTitle } from "@components/PageImgTitle/PageImgTitle"
import { FriendCard } from "@components/cards/FriendCard/FriendCard"
import { CardsContainer } from "@components/containers/CardsContainer/CardsContainer"
import { PageContainer } from "@components/containers/PageContainer/PageContainer"
import img from '@images/friendFriends.svg';


export const FriendFriendsPage:React.FC = () => {
    return (
        <PageContainer>
            <PageImgTitle 
                image={img} 
                titleFirst='friend?'
                titleSecond='friends'
            />
            <CardsContainer>
                {/* <FriendCard photo={user} age={23} location={'Kyiv, UA'} fullName='Anna Ivanova'/>
                    <FriendCard photo={user} age={23} location={'Kyiv, UA'} fullName='Anna Ivanova'/> */}
            </CardsContainer>
        </PageContainer>
    )
}
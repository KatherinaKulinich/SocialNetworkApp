import img from '@images/friends2.svg'
import user from '@images/userTest.jpg';
import errorImg from '@images/nofriends.svg'
import { theme } from '@styles/Theme';
import { PageImgTitle } from '@components/PageImgTitle/PageImgTitle'
import { FriendCard } from '@components/cards/FriendCard/FriendCard'
import { PageContainer } from '@components/containers/PageContainer/PageContainer';
import { CardsContainer } from '@components/containers/CardsContainer/CardsContainer';
import { ImageErrorMessage } from '@components/ImageErrorMessage/ImageErrorMessage';
import { SecondaryButton } from '@components/buttons/SecondaryButton/SecondaryButton';
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom';



export const MyFriendsPage:React.FC = () => {
    const [friends, setFriends] = useState([])
    const navigate = useNavigate()

    const onGoToSearch = useCallback(() => {
        navigate('/search')
    },[])


    return (
        <PageContainer>
            <PageImgTitle 
                image={img} 
                titleFirst='My'
                titleSecond='friends'
            />
            {friends.length > 0 ? (
                <CardsContainer>
                    <FriendCard photo={user} age={23} location={'Kyiv, UA'} fullName='Anna Ivanova'/>
                    <FriendCard photo={user} age={23} location={'Kyiv, UA'} fullName='Anna Ivanova'/>
                    <FriendCard photo={user} age={23} location={'Kyiv, UA'} fullName='Anna Dmitrievna Ivanova'/>
                    <FriendCard photo={user} age={23} location={'Kyiv, UA'} fullName='Anna Ivanova'/>
                    <FriendCard photo={user} age={23} location={'Kyiv, UA'} fullName='Anna Ivanova'/>
                    <FriendCard photo={user} age={23} location={'Kyiv, UA'} fullName='Anna Ivanova'/>
                    <FriendCard photo={user} age={23} location={'Kyiv, UA'} fullName='Anna Ivanova'/>
                    <FriendCard photo={user} age={23} location={'Kyiv, UA'} fullName='Anna Ivanova'/>
                    <FriendCard photo={user} age={23} location={'Kyiv, UA'} fullName='Anna Ivanova'/>
                    <FriendCard photo={user} age={23} location={'Kyiv, UA'} fullName='Anna Ivanova'/>
                    <FriendCard photo={user} age={23} location={'Kyiv, UA, jjjjjjjjjjjjjjjj jjjjj'} fullName='Anna Ivanova'/>
                    <FriendCard photo={user} age={23} location={'Kyiv, UA'} fullName='Anna Ivanova'/>
                    <FriendCard photo={user} age={23} location={'Kyiv, UA'} fullName='Anna Ivanova'/>
                    <FriendCard photo={user} age={23} location={'Kyiv, UA'} fullName='Anna Ivanova'/>
                    <FriendCard photo={user} age={23} location={'Kyiv, UA'} fullName='Anna Ivanova'/>
                    <FriendCard photo={user} age={23} location={'Kyiv, UA'} fullName='Anna Ivanova'/>
                    <FriendCard photo={user} age={23} location={'Kyiv, UA'} fullName='Anna Ivanova'/>
                    <FriendCard photo={user} age={23} location={'Kyiv, UA'} fullName='Anna Ivanova'/>
                    <FriendCard photo={user} age={23} location={'Kyiv, UA'} fullName='Anna Ivanova'/>
                    <FriendCard photo={user} age={23} location={'Kyiv, UA'} fullName='Anna Ivanova'/>
                    <FriendCard photo={user} age={23} location={'Kyiv, UA'} fullName='Anna Ivanova'/>
                </CardsContainer>
            ) : (
                <>
                    <ImageErrorMessage
                        image={errorImg} 
                        text="You haven't added any friends yet"
                    />
                    <SecondaryButton 
                        buttonText={'Go to search'} 
                        buttonColor={theme.colors.regular} 
                        type={'button'}
                        onClickHandler={onGoToSearch}
                    />
                </>
            )}
        </PageContainer>
    )
}
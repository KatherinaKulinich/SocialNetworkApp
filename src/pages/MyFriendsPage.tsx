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
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useUserData } from 'hooks/useUserData';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { fetchFriends } from 'rdx/slices/friendsSlice';
import { UserFullData } from 'types/UserFullDataType';



export const MyFriendsPage:React.FC = () => {
    const dispatch = useAppDispatch()
    const [friends, setFriends] = useState<UserFullData[]>([])
    const navigate = useNavigate()

    const onGoToSearch = useCallback(() => {
        navigate('/search')
    },[])

    const {userData} = useUserData()

    useEffect(() => {
        dispatch(fetchFriends(userData))
    }, [dispatch, userData])

    const friendsData = useAppSelector(state => state.friends.friendsData)
    const errorMessage = useAppSelector(state => state.friends.errorMessage)


    useEffect(() => {
        if (friendsData !== undefined) {
            setFriends(friendsData)
        }
    }, [friendsData, friends])
    


    return (
        <PageContainer>
            <PageImgTitle 
                image={img} 
                titleFirst='My'
                titleSecond='friends'
            />
            {friends.length > 0 ? (
                <CardsContainer>
                    {friends.map(friend => (
                        <FriendCard 
                            key={friend.userId}
                            user={friend}
                        />
                    ))}
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
            {errorMessage !== '' && (
                <ImageErrorMessage
                    image={errorImg} 
                    text="Something went wrong...Please, try later"
                />
            )}
        </PageContainer>
    )
}
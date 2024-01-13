import imgNoUsers from '@images/nofriends.svg'
import imgError from '@images/error2.svg';
import { Container } from "./usersContainer.styled"
import { ImageErrorMessage } from "@components/ImageErrorMessage/ImageErrorMessage";
import { SecondaryButton } from "@components/buttons/SecondaryButton/SecondaryButton";
import { FriendCard } from "@components/cards/userCards/FriendCard";
import { theme } from "@styles/Theme";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CardsContainer } from "../CardsContainer/CardsContainer";
import { LoaderComment } from "@components/loaders/LoaderComment";
import { UserProfile } from "types/UserProfile";
import { fetchFriends, getLoading } from 'rdx/slices/friendsSlice';



interface FriendsContainerProps {
    role: 'myFriends' | 'userFriends';
    user: UserProfile;
}



export const FriendsContainer:React.FC<FriendsContainerProps> = ({role, user}) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const isLoading = useAppSelector(state => state.friends.loading)
    console.warn(user);
    

    const { userName, userId } = user?.personalData ?? {}
    const { friends } = user?.contacts ?? {}
    
    const friendsIdsArray = friends?.map(user => user.id)

    
    useEffect(() => {
        dispatch(fetchFriends(friendsIdsArray, 'friends'))
        // dispatch(getLoading())
    }, [dispatch, friends, user])
    
    
    const errorMessage = useAppSelector(state => state.friends.errorMessage)
    const friendsData = useAppSelector(state => state.friends.friendsData)
    console.warn(friendsData);
    // console.log(isLoading);
    

    const goToSearchPage = useCallback(() => {
        navigate('/search')
    },[])

    
    



    return (
        <Container>
            {friendsData?.length > 0 && !isLoading && (
                <CardsContainer>
                    {friendsData?.map((friend:UserProfile) => (
                        <FriendCard 
                            key={friend.personalData.userId}
                            user={friend}
                        />
                    ))}
                </CardsContainer>
            )}  

            {isLoading && (
                <Container>
                    <LoaderComment/>
                </Container>
            )}
            {!isLoading && friendsData?.length === 0 && errorMessage === '' && (
                <Container>
                    <ImageErrorMessage
                        image={imgNoUsers} 
                        text={role === 'myFriends' ? "You haven't added any friends yet" : `${userName} hasn't added any friends yet`}
                    />
                    
                    {role === 'myFriends' && (
                        <SecondaryButton 
                            buttonText={'Go to search'} 
                            buttonColor={theme.colors.regular} 
                            type={'button'}
                            onClickHandler={goToSearchPage}
                        />
                    )}    
                </Container>
            )}

            {errorMessage !== '' && (
                <ImageErrorMessage
                    image={imgError} 
                    text="Something went wrong...Please, try later"
                />
            )}

        </Container>
    )
}
import imgNoUsers from '@images/nofriends.svg'
import imgError from '@images/error2.svg';
import { Container } from "./usersContainer.styled"
import { ImageErrorMessage } from "@components/ImageErrorMessage/ImageErrorMessage";
import { SecondaryButton } from "@components/buttons/SecondaryButton/SecondaryButton";
import { FriendCard } from "@components/cards/userCards/FriendCard";
import { theme } from "@styles/Theme";
import { useAppSelector } from "hooks/hooks";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { CardsContainer } from "../CardsContainer/CardsContainer";
import { LoaderComment } from "@components/loaders/LoaderComment";
import { UserProfile } from "types/UserProfile";



interface FriendsContainerProps {
    role: 'myFriends' | 'userFriends';
    user: UserProfile;
}



export const FriendsContainer:React.FC<FriendsContainerProps> = ({role, user}) => {
    const { userName } = user.personalData
    
    const errorMessage = useAppSelector(state => state.friends.errorMessage)
    const friendsData = useAppSelector(state => state.friends.friendsData)
    const isLoading = useAppSelector(state => state.friends.loading)

    const navigate = useNavigate()
    const goToSearchPage = useCallback(() => {
        navigate('/search')
    },[])

    
    



    return (
        <Container>
            {friendsData?.length > 0 && !isLoading && (
                <CardsContainer>
                    {friendsData.map((friend:UserProfile) => (
                        <FriendCard 
                            key={friend.personalData.userId}
                            user={friend}
                        />
                    ))}
                </CardsContainer>
            )}  

            {!isLoading && friendsData?.length === 0 && (
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

            {isLoading && (
                <Container>
                    <LoaderComment/>
                </Container>
            )}
        </Container>
    )
}
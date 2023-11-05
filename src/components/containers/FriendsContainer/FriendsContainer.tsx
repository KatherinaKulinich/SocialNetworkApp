import { Container, ImageContainer } from "./FriendsContainer.styled"
import imgNoUsers from '@images/nofriends.svg'
import imgError from '@images/error2.svg';
import { ImageErrorMessage } from "@components/ImageErrorMessage/ImageErrorMessage";
import { SecondaryButton } from "@components/buttons/SecondaryButton/SecondaryButton";
import { FriendCard } from "@components/cards/userCards/FriendCard";
import { theme } from "@styles/Theme";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CardsContainer } from "../CardsContainer/CardsContainer";
import { UserFullData } from "types/UserFullDataType";
import { fetchFriends } from "rdx/slices/friendsSlice";




interface FriendsContainerProps {
    role: 'myFriends' | 'userFriends';
    user: UserFullData;
}

export const FriendsContainer:React.FC<FriendsContainerProps> = ({role, user}) => {
    const dispatch = useAppDispatch()
    
    const errorMessage = useAppSelector(state => state.friends.errorMessage)
    const friendsData = useAppSelector(state => state.friends.friendsData)

    const navigate = useNavigate()
    const onGoToSearch = useCallback(() => {
        navigate('/search')
    },[])

    const [friends, setFriends] = useState<UserFullData[]>([])

    useEffect(() => {
        dispatch(fetchFriends(user))
    }, [dispatch, user])


    useEffect(() => {
        if (friendsData !== undefined) {
            setFriends(friendsData)
        }
    }, [friendsData, friends])




    return (
        <Container>
            {friends?.length > 0 ? (
                <CardsContainer>
                    {friends.map(friend => (
                        <FriendCard 
                            key={friend.userId}
                            user={friend}
                        />
                    ))}
                </CardsContainer>
            ) : (
                <ImageContainer>
                    <ImageErrorMessage
                        image={imgNoUsers} 
                        text={role === 'myFriends' ? "You haven't added any friends yet" : `${user.userName} hasn't added any friends yet`}
                    />
                    
                    {role === 'myFriends' && (
                        <SecondaryButton 
                            buttonText={'Go to search'} 
                            buttonColor={theme.colors.regular} 
                            type={'button'}
                            onClickHandler={onGoToSearch}
                        />
                    )}    
                </ImageContainer>
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
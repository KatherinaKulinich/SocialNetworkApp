import { ImageErrorMessage } from "@components/ImageErrorMessage/ImageErrorMessage";
import { FollowingCard } from "@components/cards/userCards/FollowingCard";
import { Container } from "./usersContainer.styled"
import imgError from '@images/error2.svg';
import imgNoUsers from '@images/nofriends.svg'
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { useAuth } from "hooks/useAuth";
import { fetchFriends } from "rdx/slices/friendsSlice";
import { fetchUserFullData } from "rdx/slices/userDataSlice";
import { useEffect } from "react";
import { CardsContainer } from "../CardsContainer/CardsContainer";
import { SubTitle } from "@components/text/Subtitle";



export const FollowingListContainer:React.FC = () => {
    const dispatch = useAppDispatch()
    const myData = useAppSelector(state => state.userData.user)
    const { userId } = useAuth()

    useEffect(() => {
        const getMyProfileData = () => {
            if (userId) {
                dispatch(fetchUserFullData(userId))
            }
        }
        getMyProfileData()
    }, [])

    useEffect(() => {
        if (myData) {
            dispatch(fetchFriends(myData.followingList, 'followingList'))
        }
    }, [myData])

    const followingListUsersData = useAppSelector(state => state.friends.followingListData)
    console.log(followingListUsersData);
    
    const errorMessage = useAppSelector(state => state.friends.errorMessage)

    return (
        <Container>
            <SubTitle text='You have sent a friend request to these users and you follow them'/>

            {followingListUsersData.length > 0 ? (
                <CardsContainer>
                    {followingListUsersData.map(user => (
                        <FollowingCard 
                            key={user.userId}
                            user={user}
                        />
                    ))}
                </CardsContainer>
            ) : (
                <ImageErrorMessage
                    image={imgNoUsers} 
                    text="You don't follow any users yet"
                />
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
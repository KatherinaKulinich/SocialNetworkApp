import { ImageErrorMessage } from "@components/ImageErrorMessage/ImageErrorMessage"
import { RequestCard } from "@components/cards/userCards/RequestCard"
import { useAppDispatch, useAppSelector } from "hooks/hooks"
import { useAuth } from "hooks/useAuth"
import { fetchFriends } from "rdx/slices/friendsSlice"
import { fetchUserFullData } from "rdx/slices/userDataSlice"
import { useEffect } from "react"
import { CardsContainer } from "../CardsContainer/CardsContainer"
import { Container } from "./usersContainer.styled"
import imgError from '@images/error2.svg';
import imgNoUsers from '@images/nousers.svg'
import { SubTitle } from "@components/text/Subtitle"




export const FriendRequestsContainer:React.FC = () => {
    
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
            dispatch(fetchFriends(myData.friendRequests, 'friendRequests'))
        }
    }, [myData])

    const friendRequestsUsersData = useAppSelector(state => state.friends.friendRequestsData)
    const errorMessage = useAppSelector(state => state.friends.errorMessage)


    return (
        <Container>
            <SubTitle text='These users would like to be your friend'/>
            
            {friendRequestsUsersData.length > 0 ? (
                <CardsContainer>
                    {friendRequestsUsersData.map(friend => (
                        <RequestCard 
                            key={friend.userId}
                            user={friend}
                        />
                    ))}
                </CardsContainer>
            ) : (
                <ImageErrorMessage
                    image={imgNoUsers} 
                    text="No one has sent you a friend request"
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

import { useAppDispatch, useAppSelector } from "hooks/hooks"
import { useAuth } from "hooks/authorization/useAuth"
import { fetchFriends } from "rdx/slices/friendsSlice"
import { fetchUserFullData } from "rdx/slices/userDataSlice"
import { useEffect } from "react"
import { Container } from "./usersContainer.styled"
import imgError from '@images/error2.svg';
import imgNoUsers from '@images/nofriends.svg'
import { FriendCard } from "@components/cards/userCards/FriendCard"
import { ImageErrorMessage } from "@components/ImageErrorMessage/ImageErrorMessage"
import { CardsContainer } from "../CardsContainer/CardsContainer"
import { SubTitle } from "@components/text/Subtitle"




export const FollowersContainer:React.FC = () => {
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
            dispatch(fetchFriends(myData.followers, 'followers'))
        }
    }, [myData])

    const followersData = useAppSelector(state => state.friends.followersData)
    const errorMessage = useAppSelector(state => state.friends.errorMessage)

    return (
        <Container>
            <SubTitle text='These users follow you'/>
            
            {followersData?.length > 0 ? (
                <CardsContainer>
                    {followersData.map(user => (
                        <FriendCard 
                            key={user.userId}
                            user={user}
                        />
                    ))}
                </CardsContainer>
            ) : (
                <ImageErrorMessage
                    image={imgNoUsers} 
                    text="You don't have any followers yet"
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
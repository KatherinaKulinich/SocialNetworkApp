import { PageImgTitle } from "@components/PageImgTitle/PageImgTitle"
import { PageContainer } from "@components/containers/PageContainer/PageContainer"
import img from '@images/myRequests.svg'
import imgError from '@images/error2.svg';
import imgNoUsers from '@images/nofriends.svg'
import { CardsContainer } from "@components/containers/CardsContainer/CardsContainer";
import { ImageErrorMessage } from "@components/ImageErrorMessage/ImageErrorMessage";
import { SubTitle } from "@components/text/Subtitle";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { useUserData } from "hooks/useUserData";
import { fetchFriends } from "rdx/slices/friendsSlice";
import { useEffect } from "react";
import { RequestCard } from "@components/cards/userCards/RequestCard";




export const MyFriendRequestsPage: React.FC = () => {
    
    //TEST (friends page example})
    // const dispatch = useAppDispatch()
    // const {userData} = useUserData()
    
    // useEffect(() => {
    //     dispatch(fetchFriends(userData))
    // }, [dispatch, userData])

    // const friendsData = useAppSelector(state => state.friends.friendsData)
    // const errorMessage = useAppSelector(state => state.friends.errorMessage)


    return (
        <PageContainer>
            <PageImgTitle 
                image={img} 
                titleFirst='My friend'
                titleSecond="requests"
            />
            <SubTitle text='These users would like to be your friend'/>
{/* 
            {friendsData.length > 0 ? (
                <CardsContainer>
                    {friendsData.map(friend => (
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
            )} */}
        </PageContainer>
    )
}
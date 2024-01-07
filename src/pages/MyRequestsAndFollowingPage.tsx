import img from '@images/myRequests.svg'
import imgError from '@images/error2.svg';
import imgNoUsers from '@images/nousers.svg'
import { PageImgTitle } from "@components/PageImgTitle/PageImgTitle"
import { PageContainer } from "@components/containers/PageContainer/PageContainer"
import { SubTitle } from "@components/text/Subtitle";
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { useAuth } from 'hooks/authorization/useAuth';
import { fetchFriends } from 'rdx/slices/friendsSlice';
import { fetchUserFullData } from 'rdx/slices/userDataSlice';
import { useEffect } from 'react';
import { ImageErrorMessage } from '@components/ImageErrorMessage/ImageErrorMessage';
import { RequestCard } from '@components/cards/userCards/RequestCard';
import { CardsContainer } from '@components/containers/CardsContainer/CardsContainer';
import { TwoTabsContainer } from '@components/tabs/TwoTabsContainer';
import { FollowingListContainer } from '@components/containers/usersContainers/FollowingListContainer';
import { FriendRequestsContainer } from '@components/containers/usersContainers/FriendRequestsContainer';





export const MyFriendRequestsPage: React.FC = () => {
    
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
        <PageContainer>
            <PageImgTitle 
                image={img} 
                titleFirst='My friend requests'
                titleSecond="and following list"
            />
           
            <TwoTabsContainer 
                firstTabName={'Friend requests'} 
                secondTabName={'Following list'} 
                firstTabContent={
                    <FriendRequestsContainer/>
                } 
                secondTabContent={
                    <FollowingListContainer/>
                }
            />

            {/* {friendRequestsUsersData.length > 0 ? (
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
            )}  */}
        </PageContainer>
    )
}
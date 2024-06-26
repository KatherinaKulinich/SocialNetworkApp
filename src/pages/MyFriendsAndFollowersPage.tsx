import img from '@images/friends2.svg'
import { PageImgTitle } from '@components/PageImgTitle/PageImgTitle'
import { PageContainer } from '@components/containers/PageContainer/PageContainer';
import { FriendsContainer } from '@components/containers/usersContainers/FriendsContainer';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { useUsersBirthdays } from 'hooks/birthdays/useUsersBirthdays';
import { TwoTabsContainer } from '@components/tabs/TwoTabsContainer';
import { FollowersContainer } from '@components/containers/usersContainers/FollowersContainer';
import { BirthdayNotification } from '@components/notifications/BirthdayNotification';
import { NewUnreadMessagesNotification } from '@components/notifications/NewUnreadMessagesNotification';
import { useUnreadMessages } from 'hooks/chat/useUreadMessages';
import { useAuth } from 'hooks/authorization/useAuth';
import { fetchUserFullData } from 'rdx/slices/userDataSlice';
import { useEffect } from 'react';






export const MyFriendsAndFollowersPage:React.FC = () => {
    const dispatch = useAppDispatch()
    const { userId } = useAuth()

    useEffect(() => {
        if (userId) {
            dispatch(fetchUserFullData(userId))
        }
    }, [])
    const friendsData = useAppSelector(state => state.friends.friendsData)

    const { usersBirthdayToday } = useUsersBirthdays(friendsData)
    const myData = useAppSelector(state => state.userData.user)

    const birthdaysNotificationText = `${usersBirthdayToday.toString()} celebrate(s) birthday today!`

    const { areUnreadMessages } = useUnreadMessages(myData)
    const isUnreadMessagesAmount =  areUnreadMessages.length > 0

    

    return (
        <PageContainer>
            <PageImgTitle 
                image={img} 
                titleFirst='My friends'
                titleSecond='and followers'
            />
            <TwoTabsContainer 
                firstTabName={'My friends'} 
                secondTabName={'My followers'} 
                firstTabContent={
                    <FriendsContainer
                        role='myFriends' 
                        user={myData}           
                    />
                } 
                secondTabContent={
                    <FollowersContainer/>
                }
            />
            
            {usersBirthdayToday.length > 0 && (
                <BirthdayNotification text={birthdaysNotificationText}/>
            )}
            {isUnreadMessagesAmount  && <NewUnreadMessagesNotification/>}
        </PageContainer>
    )
}
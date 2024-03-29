import img from '@images/friends2.svg'
import { PageImgTitle } from '@components/PageImgTitle/PageImgTitle'
import { PageContainer } from '@components/containers/PageContainer/PageContainer';
import { FriendsContainer } from '@components/containers/usersContainers/FriendsContainer';
import { useAppSelector } from 'hooks/hooks';
import { useUsersBirthdays } from 'hooks/birthdays/useUsersBirthdays';
import { TwoTabsContainer } from '@components/tabs/TwoTabsContainer';
import { FollowersContainer } from '@components/containers/usersContainers/FollowersContainer';
import { BirthdayNotification } from '@components/notifications/BirthdayNotification';
import { useMyFullData } from 'hooks/useMyFullData';
import { NewUnreadMessagesNotification } from '@components/notifications/NewUnreadMessagesNotification';
import { useUnreadMessages } from 'hooks/chat/useUreadMessages';






export const MyFriendsAndFollowersPage:React.FC = () => {
    const friendsData = useAppSelector(state => state.friends.friendsData)

    const { usersBirthdayToday } = useUsersBirthdays(friendsData)
    const myData = useAppSelector(state => state.userData.user)

    const birthdaysNotificationText = `${usersBirthdayToday.toString()} celebrate(s) birthday today!`

    const { areUnreadMessages } = useUnreadMessages(myData)
    const isChatsAmount =  areUnreadMessages.length
    const isMessagesNotification = isChatsAmount > 0

    

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
            {isMessagesNotification && <NewUnreadMessagesNotification   chatsAmount={isChatsAmount}/>}
        </PageContainer>
    )
}
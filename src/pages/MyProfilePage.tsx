import TitleImg from '@images/profileTitle.svg'
import { PageImgTitle } from "@components/PageImgTitle/PageImgTitle"
import { UserProfileCard } from "@components/cards/UserProfile/UserProfileCard"
import { PageContainer } from "@components/containers/PageContainer/PageContainer"
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { fetchFriends } from 'rdx/slices/friendsSlice';
import { useEffect, useState } from 'react';
import { useMyFullData } from 'hooks/useMyFullData';
import { useUsersBirthdays } from 'hooks/birthdays/useUsersBirthdays';
import { BirthdayNotification } from '@components/notifications/BirthdayNotification';
import { UserProfile } from 'types/UserProfile';
import { useUnreadMessages } from 'hooks/chat/useUreadMessages';
import { NewUnreadMessagesNotification } from '@components/notifications/NewUnreadMessagesNotification';





export const MyProfilePage:React.FC = () => {
    const dispatch = useAppDispatch()
    const myData = useMyFullData()
    const { friends } = myData.contacts ?? {}
    const friendsIdsArray = friends?.map(user => user.id) || []


    useEffect(() => {
        dispatch(fetchFriends(friendsIdsArray, 'friends'))
    }, [])
    
    const friendsData = useAppSelector(state => state.friends.friendsData)
    const [friendsUsersData, setFriendsUsersData] = useState<Array<UserProfile>>([])
    
    useEffect(() => {
        if (friendsData) {
            if (friendsData?.length === friendsIdsArray.length) {
                setFriendsUsersData(friendsData)
            }
        }
    }, [friendsData])
    
    const { isMyBirthdayToday } = useUsersBirthdays(friendsUsersData)

    const { areUnreadMessages } = useUnreadMessages(myData)
    const isChatsAmount =  areUnreadMessages.length
    const isMessagesNotification = isChatsAmount > 0
    
    return (
        <PageContainer>
            <PageImgTitle 
                image={TitleImg} 
                titleFirst="My"
                titleSecond="profile"
            />
            {Object.keys(myData).length === 6 && (
                <UserProfileCard
                    role='myProfile'
                    user={myData} 
                    friendsData={friendsUsersData}
                />
            )}
            {isMyBirthdayToday && (
                <BirthdayNotification text={`Happy Birthday, ${myData?.personalData?.userName}!`}/>
            )}
            {isMessagesNotification && <NewUnreadMessagesNotification  chatsAmount={isChatsAmount}/>}
        </PageContainer>
    )
}
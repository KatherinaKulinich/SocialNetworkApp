import TitleImg from '@images/profileTitle.svg'
import { PageImgTitle } from "@components/PageImgTitle/PageImgTitle"
import { UserProfileCard } from "@components/cards/UserProfile/UserProfileCard"
import { PageContainer } from "@components/containers/PageContainer/PageContainer"
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { fetchFriends } from 'rdx/slices/friendsSlice';
import { useEffect, useState } from 'react';
import { useUsersBirthdays } from 'hooks/birthdays/useUsersBirthdays';
import { BirthdayNotification } from '@components/notifications/BirthdayNotification';
import { UserProfile } from 'types/UserProfile';
import { useUnreadMessages } from 'hooks/chat/useUreadMessages';
import { NewUnreadMessagesNotification } from '@components/notifications/NewUnreadMessagesNotification';
import { useAuth } from 'hooks/authorization/useAuth';
import { fetchUserFullData } from 'rdx/slices/userDataSlice';





export const MyProfilePage:React.FC = () => {
    const dispatch = useAppDispatch()
    const { userId } = useAuth()

    useEffect(() => {
        if (userId) {
            dispatch(fetchUserFullData(userId))
        }
    }, [])
    const myData = useAppSelector(state => state.userData.user)

    
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
    const isUnreadMessagesAmount =  areUnreadMessages.length > 0

    
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
            {isUnreadMessagesAmount  && <NewUnreadMessagesNotification/>}
        </PageContainer>
    )
}
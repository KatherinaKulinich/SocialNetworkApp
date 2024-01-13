import img from '@images/friends2.svg'
import { PageImgTitle } from '@components/PageImgTitle/PageImgTitle'
import { PageContainer } from '@components/containers/PageContainer/PageContainer';
import { FriendsContainer } from '@components/containers/usersContainers/FriendsContainer';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { useAuth } from 'hooks/authorization/useAuth';
import { fetchFriends } from 'rdx/slices/friendsSlice';
import { fetchUserFullData } from 'rdx/slices/userDataSlice';
import { useEffect } from 'react';
import { useUsersBirthdays } from 'hooks/birthdays/useUsersBirthdays';
import { notification } from 'antd';
import { GiGlassCelebration } from "react-icons/gi"
import { Icon } from '@components/icons/Icon';
import { theme } from '@styles/Theme';
import { TwoTabsContainer } from '@components/tabs/TwoTabsContainer';
import { FollowersContainer } from '@components/containers/usersContainers/FollowersContainer';
import { Friend } from 'types/UserProfile';
import { BirthdayNotification } from '@components/popups/BirthdayNotification';
import { useMyFullData } from 'hooks/useMyFullData';






export const MyFriendsAndFollowersPage:React.FC = () => {
    const dispatch = useAppDispatch()
    const { userId } = useAuth()

    // const userData = useAppSelector(state => state.userData.user)
    const friendsData = useAppSelector(state => state.friends.friendsData)

    const { usersBirthdayToday } = useUsersBirthdays(friendsData)
    const userData = useMyFullData()

    
    // const { friends } = userData.contacts
    // const friendsIdsArray = friends.map((user:Friend) => user.id)
    
    // useEffect(() => {
    //     const getMyProfileData = () => {
    //         if (userId && userData) {
    //             dispatch(fetchUserFullData(userId))
    //         }
    //     }
    //     getMyProfileData()
    // }, [])

    // useEffect(() => {
    //     if (userData) {
    //         dispatch(fetchFriends(friendsIdsArray, 'friends'))
    //     }
    // }, [])


    const birthdaysNotificationText = `${usersBirthdayToday.toString()} celebrate(s) birthday today!`

    


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
                        user={userData}           
                    />
                } 
                secondTabContent={
                    <FollowersContainer/>
                }
            />
            {usersBirthdayToday.length > 0 && (
                <BirthdayNotification text={birthdaysNotificationText}/>
            )}
        </PageContainer>
    )
}
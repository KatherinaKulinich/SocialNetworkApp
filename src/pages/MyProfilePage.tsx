import TitleImg from '@images/profileTitle3.svg'
import { PageImgTitle } from "@components/PageImgTitle/PageImgTitle"
import { UserProfileCard } from "@components/cards/UserProfile/UserProfileCard"
import { PageContainer } from "@components/containers/PageContainer/PageContainer"
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { fetchFriends } from 'rdx/slices/friendsSlice';
import { useEffect } from 'react';
import { fetchUserFullData } from 'rdx/slices/userDataSlice'
import { useAuth } from 'hooks/authorization/useAuth'
import { useMyFullData } from 'hooks/useMyFullData';
import { useUsersBirthdays } from 'hooks/birthdays/useUsersBirthdays';
import { BirthdayNotification } from '@components/popups/BirthdayNotification';





export const MyProfilePage:React.FC = () => {
    const dispatch = useAppDispatch()
    const userData = useMyFullData()
    console.log(userData);
    // const { friends } = userData.contacts ?? {}

    // const friendsIdsArray = friends.map(user => user.id)
    // console.warn('ids', friendsIdsArray);

    // useEffect(() => {
    //     if (userData.contacts) {
    //         dispatch(fetchFriends(friendsIdsArray, 'friends'))
    //     }
    // }, [dispatch, userData])
    
    const friendsData = useAppSelector(state => state.friends.friendsData)
    
    // const { userId } = useAuth()
    
    
    // useEffect(() => {
        //     if (userId) {
            //         dispatch(fetchUserFullData(userId))
            //     }
            // }, [dispatch, userId])
            
            // const userData = useAppSelector(state => state.userData.user)
            // console.warn('prof', userData, userId);
            
            // const { friends } = userData.contacts
            // const friendsIdsArray = friends.map(user => user.id)
            
            // useEffect(() => {
                //     if (userData) {
                    //         dispatch(fetchFriends(friendsIdsArray, 'friends'))
                    //     }
                    // }, [dispatch, userData])
                    

    const { isMyBirthdayToday } = useUsersBirthdays(friendsData)
 
    
    return (
        <PageContainer>
            <PageImgTitle 
                image={TitleImg} 
                titleFirst="My"
                titleSecond="profile"
            />
            {Object.keys(userData).length === 6 && (
                <UserProfileCard
                    role='myProfile'
                    user={userData} 
                    friendsData={friendsData}
                />
            )}
            {isMyBirthdayToday && (
                <BirthdayNotification text={`Happy Birthday, ${userData?.personalData?.userName}!`}/>
            )}
        </PageContainer>
    )
}
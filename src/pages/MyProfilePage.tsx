import TitleImg from '@images/profileTitle.svg'
import { PageImgTitle } from "@components/PageImgTitle/PageImgTitle"
import { UserProfileCard } from "@components/cards/UserProfile/UserProfileCard"
import { PageContainer } from "@components/containers/PageContainer/PageContainer"
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { fetchFriends } from 'rdx/slices/friendsSlice';
import { useEffect, useState } from 'react';
import { useMyFullData } from 'hooks/useMyFullData';
import { useUsersBirthdays } from 'hooks/birthdays/useUsersBirthdays';
import { BirthdayNotification } from '@components/popups/BirthdayNotification';
import { UserProfile } from 'types/UserProfile';





export const MyProfilePage:React.FC = () => {
    const dispatch = useAppDispatch()
    const userData = useMyFullData()
    // const userData = useAppSelector(state => state.userData.user)
    const { friends } = userData.contacts ?? {}
    const friendsIdsArray = friends?.map(user => user.id) || []

    // useEffect(() => {
    //     console.log('owner');
        
    // }, [userData])
    //  useEffect(() => {
    //     console.log('USER__', userData );
        
    // }, [ userData])


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
                    friendsData={friendsUsersData}
                />
            )}
            {isMyBirthdayToday && (
                <BirthdayNotification text={`Happy Birthday, ${userData?.personalData?.userName}!`}/>
            )}
        </PageContainer>
    )
}
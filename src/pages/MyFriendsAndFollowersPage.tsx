import img from '@images/friends2.svg'
import { PageImgTitle } from '@components/PageImgTitle/PageImgTitle'
import { PageContainer } from '@components/containers/PageContainer/PageContainer';
import { FriendsContainer } from '@components/containers/usersContainers/FriendsContainer';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { useAuth } from 'hooks/useAuth';
import { fetchFriends } from 'rdx/slices/friendsSlice';
import { fetchUserFullData } from 'rdx/slices/userDataSlice';
import { useEffect } from 'react';
import { useUsersBirthdays } from 'hooks/useUsersBirthdays';
import { notification } from 'antd';
import { GiGlassCelebration } from "react-icons/gi"
import { Icon } from '@components/icons/Icon';
import { theme } from '@styles/Theme';
import { TwoTabsContainer } from '@components/tabs/TwoTabsContainer';
import { FollowersContainer } from '@components/containers/usersContainers/FollowersContainer';






export const MyFriendsPage:React.FC = () => {
    const dispatch = useAppDispatch()
    const userData = useAppSelector(state => state.userData.user)
    const { userId } = useAuth()
    const friendsData = useAppSelector(state => state.friends.friendsData)
    const { usersBirthdayToday } = useUsersBirthdays(friendsData)

    const [api, contextHolder] = notification.useNotification();


    const openNotification = () => {
        api.open({
            message: 'Birthday',
            description:
                `${usersBirthdayToday.toString()} celebrate(s) birthday today!`,
            icon: <Icon 
                    icon={<GiGlassCelebration />} 
                    iconSize={'30px'} 
                    iconColor={theme.colors.regular}
                />,
            duration: 8,
        });
    };

    
    useEffect(() => {
        const getMyProfileData = () => {
            if (userId && userData) {
                dispatch(fetchUserFullData(userId))
                // dispatch(fetchFriends(userData.friends, 'friends'))
            }
        }
        getMyProfileData()
    }, [])

    useEffect(() => {
        if (userData) {
            dispatch(fetchFriends(userData.friends, 'friends'))
        }
    }, [userData.friends])

    useEffect(() => {
        if (usersBirthdayToday.length > 0) {
            openNotification()
        }
    }, [usersBirthdayToday])

    


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
            {contextHolder}
        </PageContainer>
    )
}
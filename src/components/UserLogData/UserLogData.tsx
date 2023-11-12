import { Container, NameContainer, Text } from './UserLogData.styled';
import { Icon } from '@components/icons/Icon';
import { PiUserCircleLight } from 'react-icons/Pi'
import { Avatar } from '@components/Avatar/Avatar';
import { theme } from '@styles/Theme';
import { useAppSelector, useAppDispatch } from 'hooks/hooks';
import { useEffect } from 'react';
import { useAuth } from 'hooks/useAuth';
import { fetchUserFullData } from 'rdx/slices/userDataSlice';
import { fetchFriends } from 'rdx/slices/friendsSlice';




export const UserLogData:React.FC = () => {
    const userData = useAppSelector(state => state.userData.user)

    const dispatch = useAppDispatch()
    const { userId } = useAuth()


    
    useEffect(() => {
        const getMyProfileData = () => {
            if (userId && userData) {
            dispatch(fetchUserFullData(userId))
            dispatch(fetchFriends(userData))
        }
    }
    getMyProfileData()
    }, [])
    


    return (
        <Container>
            {userData?.userAvatar ? (
                <Avatar 
                    photo={userData?.userAvatar}
                    border={`${theme.colors.lightGray}`}
                    size={'50px'}
                />  
            ) : (
                <Icon 
                    icon={<PiUserCircleLight/>} 
                    iconColor='#fff' 
                    iconSize='50px'
                />
            )}
            <NameContainer>
                <Text>
                    {userData?.userName}
                </Text>
                <Text>
                    {userData?.userSurname}
                </Text>
            </NameContainer>        
        </Container>
    )
}
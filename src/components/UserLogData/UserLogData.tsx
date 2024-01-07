import { Container, NameContainer, Text } from './UserLogData.styled';
import { Icon } from '@components/icons/Icon';
import { PiUserCircleLight } from 'react-icons/Pi'
import { Avatar } from '@components/Avatar/Avatar';
import { theme } from '@styles/Theme';
import { useAppSelector, useAppDispatch } from 'hooks/hooks';
import { useEffect } from 'react';
import { useAuth } from 'hooks/authorization/useAuth';
import { fetchUserFullData } from 'rdx/slices/userDataSlice';
import { useMyFullData } from 'hooks/useMyFullData';





export const UserLogData:React.FC = () => {
    const userData = useMyFullData()
    // const dispatch = useAppDispatch()
    // const { userId } = useAuth()
    
    
    
    
    // useEffect(() => {
    //     const getMyProfileData = () => {
    //         if (userId) {
    //             dispatch(fetchUserFullData(userId))
    //         }
    //     }
    //     getMyProfileData()
    // }, [dispatch, userId])
    
    // const userData = useAppSelector(state => state.userData.user)
    // const { userName, userSurname } = userData.personalData
    // const { userAvatar } = userData.profileData


    return (
        <Container>
            {/* {userAvatar ? (
                <Avatar 
                    photo={userAvatar}
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
                    {userName}
                </Text>
                <Text>
                    {userSurname}
                </Text>
            </NameContainer>         */}
        </Container>
    )
}
import { Container, NameContainer, Text } from './UserLogData.styled';
import { Icon } from '@components/icons/Icon';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { PiUserCircleLight } from 'react-icons/Pi'
import { Avatar } from '@components/Avatar/Avatar';
import { useAuth } from 'hooks/useAuth';
import { fetchUserFullData } from 'rdx/slices/userDataSlice';
import { useEffect } from 'react';
import { theme } from '@styles/Theme';




export const UserLogData:React.FC = () => {
    const dispatch = useAppDispatch()
    const { userId } = useAuth()
    const { userAvatar, userName, userSurname } = useAppSelector(state => state.userData.user)

    useEffect(() => {
        if (userId !== null && userId !== undefined ) {
            dispatch(fetchUserFullData(userId))
        }
    }, [dispatch, userId])
    

    


    return (
        <Container>
            {userAvatar ? (
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
            </NameContainer>        
        </Container>
    )
}
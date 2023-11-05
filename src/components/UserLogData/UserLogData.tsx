import { Container, NameContainer, Text } from './UserLogData.styled';
import { Icon } from '@components/icons/Icon';
import { PiUserCircleLight } from 'react-icons/Pi'
import { Avatar } from '@components/Avatar/Avatar';
import { theme } from '@styles/Theme';
import { useUserData } from 'hooks/useUserData';




export const UserLogData:React.FC = () => {

    const { userData } = useUserData()
    console.warn(userData);
    


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
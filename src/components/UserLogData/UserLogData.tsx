import { Container, NameContainer, Text } from './UserLogData.styled';
import { Icon } from '@components/icons/Icon';
import { PiUserCircleLight } from 'react-icons/Pi'
import { Avatar } from '@components/Avatar/Avatar';
import { theme } from '@styles/Theme';
import { useUserData } from 'hooks/useUserData';




export const UserLogData:React.FC = () => {

    const { userAvatar, userName, userSurname } = useUserData()


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
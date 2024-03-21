import { Container, NameContainer, Text } from './UserLogData.styled';
import { Icon } from '@components/icons/Icon';
import { PiUserCircleLight } from 'react-icons/Pi'
import { Avatar } from '@components/Avatar/Avatar';
import { theme } from '@styles/Theme';
import { useMyFullData } from 'hooks/useMyFullData';





export const UserLogData:React.FC = () => {
    const userData = useMyFullData()
    const { userName, userSurname } = userData?.personalData ?? {}
    const { userAvatar } = userData?.profileData ?? {}


    return (
        <Container>
            {Object.keys(userData).length === 6 && (
                <>
                    {userAvatar ? (
                        <Avatar 
                            photo={userAvatar}
                            border={`${theme.colors.lightGray}`}
                            size={'40px'}
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
                </> 
            )}
        </Container>
    )
}
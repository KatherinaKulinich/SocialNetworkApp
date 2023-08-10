import { Container, NameContainer, Text } from './UserLogData.styled';
import { Icon } from '@components/icons/Icon';
import { PiUserCircleLight } from 'react-icons/Pi'




export const UserLogData:React.FC = () => {
    return (
        <Container>
            {/* <UserAvatar 
                src={AvatarDefault} 
                alt='user avatar' 
            />   */}
            <Icon 
                icon={<PiUserCircleLight/>} 
                iconColor='#fff' 
                iconSize='50px'
            />
            <NameContainer>
                <Text>
                    Name
                </Text>
                <Text>
                    Surname
                </Text>
            </NameContainer>        
        </Container>
    )
}
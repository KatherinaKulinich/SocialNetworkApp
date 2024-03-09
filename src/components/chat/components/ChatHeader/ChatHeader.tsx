import { Container, Name, UserInfo } from "./ChatHeader.styled"
import user from '@images/404.svg';
import { theme } from "@styles/Theme";
import { MdDoubleArrow } from 'react-icons/Md';
import { IconButton } from "@components/buttons/IconButton/IconButton";
import { Link } from "react-router-dom";
import { Avatar } from "@components/Avatar/Avatar";
import { UserProfile } from "types/UserProfile";

interface ChatHeaderProps {
    user: UserProfile
}


export const ChatHeader:React.FC<ChatHeaderProps> = ({user}) => {
    const { userFullname } = user?.personalData;
    const { userAvatar} = user?.profileData;

    return (
        <Container>
            <Link to={'/myChats'}>
                <IconButton 
                    icon={<MdDoubleArrow style = {{transform: 'rotate(180deg)' }}/>} 
                    color={theme.colors.regular} 
                    size={"40px"} 
                    type={"button"} 
                />
            </Link>
            <UserInfo to={`/users/${userFullname}/profile`}>
                <Avatar 
                    photo={userAvatar} 
                    border={theme.colors.regular} 
                    size='30px'
                />
                <Name>
                    {userFullname}
                </Name>
            </UserInfo>
        </Container>
    )
}
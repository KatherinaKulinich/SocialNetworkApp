import { Container, Name, UserInfo } from "./ChatHeader.styled"
import { Tooltip } from 'antd';
import { theme } from "@styles/Theme";
import { MdDoubleArrow } from 'react-icons/Md';
import { IconButton } from "@components/buttons/IconButton/IconButton";
import { Link } from "react-router-dom";
import { Avatar } from "@components/Avatar/Avatar";
import { UserProfile } from "types/UserProfile";
import { DropdownMenu } from "../DropdownMenu";

interface ChatHeaderProps {
    user: UserProfile
}


export const ChatHeader:React.FC<ChatHeaderProps> = ({user}) => {
    const { userFullname } = user?.personalData;
    const { userAvatar} = user?.profileData;

    return (
        <Container>
            <Tooltip title="back to chats page">
                <Link to={'/myChats'}>
                    <IconButton 
                        icon={<MdDoubleArrow style = {{transform: 'rotate(180deg)' }}/>} 
                        color={theme.colors.regular} 
                        size={"40px"} 
                        type={"button"} 
                    />
                </Link>
            </Tooltip>
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
            <DropdownMenu/>
        </Container>
    )
}
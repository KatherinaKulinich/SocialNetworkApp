import { Container, Name, UserInfo } from "./ChatHeader.styled"
import { Tooltip } from 'antd';
import { theme } from "@styles/Theme";
import { MdDoubleArrow } from 'react-icons/Md';
import { IconButton } from "@components/buttons/IconButton/IconButton";
import { Link } from "react-router-dom";
import { Avatar } from "@components/Avatar/Avatar";
import { UserProfile } from "types/UserProfile";
import { DropdownMenu } from "../DropdownMenu";
import { useAppSelector } from "hooks/hooks";
import { useChatManagement } from "hooks/chat/useChatManagement";

interface ChatHeaderProps {
    user: UserProfile,
    onOpenDrawerMedia: () => void,
    onOpenDrawerSettings: () => void,
    chatId: string,
}


export const ChatHeader:React.FC<ChatHeaderProps> = ({user, onOpenDrawerMedia, onOpenDrawerSettings, chatId}) => {
    const { userFullname } = user?.personalData;
    const { userAvatar} = user?.profileData;
    const myData = useAppSelector(state => state.userData.user)

    const { deleteChat } = useChatManagement(chatId, myData, user)

    return (
        <Container>
            <Tooltip title="back to chats page">
                <Link to={'/myChats'}>
                    <IconButton 
                        icon={<MdDoubleArrow style = {{transform: 'rotate(180deg)' }}/>} 
                        color={theme.colors.regular} 
                        size={"30px"} 
                        type={"button"} 
                    />
                </Link>
            </Tooltip>
            <UserInfo to={`/users/${userFullname}/profile`}>
                <Avatar 
                    photo={userAvatar} 
                    border={theme.colors.regular} 
                    size='25px'
                />
                <Name>
                    {userFullname}
                </Name>
            </UserInfo>
            <DropdownMenu 
                openDrawerMedia={onOpenDrawerMedia} 
                openDrawerSettings={onOpenDrawerSettings} 
                deleteChat={deleteChat}
            />
        </Container>
    )
}
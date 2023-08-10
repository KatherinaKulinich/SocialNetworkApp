import { MdDoubleArrow } from "react-icons/Md";
import { Icon } from "../../icons/Icon";
import { theme } from "@styles/Theme";
import { CardContent, ChatCard, MessageInfo, MessageText, UserName } from "./ChatItemCard.styled";
import { Avatar } from "@components/Avatar/Avatar";

interface ChatItemCardProps {
    userName: string;
    userAvatar: string;
    lastMessage: string;
}


export const ChatItemCard:React.FC<ChatItemCardProps> = ({userName, userAvatar, lastMessage}) => {
    return (
        <ChatCard to={'chat'}>
            <CardContent>
                <Avatar 
                    photo={userAvatar} 
                    border={theme.colors.regular} 
                    size="40px"
                />
                <MessageInfo>
                    <UserName>
                        {userName}
                    </UserName>
                    <MessageText>
                        {lastMessage}
                    </MessageText>
                </MessageInfo>
            </CardContent>
            <Icon 
                icon={<MdDoubleArrow/>} 
                iconSize="40px" 
                iconColor={theme.colors.regular}
            /> 
        </ChatCard>
    )
}
import { MdDoubleArrow } from "react-icons/Md";
import { Icon } from "../../icons/Icon";
import { theme } from "@styles/Theme";
import { CardContent, ChatCard, MessageInfo, MessageText, UserName } from "./ChatItemCard.styled";
import { Avatar } from "@components/Avatar/Avatar";
import { Chat } from "types/Chat";

interface ChatItemCardProps {
    chatItemData: Chat
}


export const ChatItemCard:React.FC<ChatItemCardProps> = ({chatItemData}) => {
    const { user, lastMessage } = chatItemData

    const isLastMessage = lastMessage.senderName ? `${lastMessage.senderName}: ${lastMessage.text}` : 'no messages yet'

    return (
        <ChatCard to={'chat'}>
            <CardContent>
                <Avatar 
                    photo={user.userAvatar} 
                    border={theme.colors.regular} 
                    size="40px"
                />
                <MessageInfo>
                    <UserName>
                        {user.userName}
                    </UserName>
                    <MessageText>
                        {isLastMessage}
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
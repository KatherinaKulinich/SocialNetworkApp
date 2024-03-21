import { MdDoubleArrow } from "react-icons/Md";
import { Icon } from "../../icons/Icon";
import { theme } from "@styles/Theme";
import { CardContent, ChatCard, MessageInfo, MessageText, UserName, Badge, BadgeText } from "./ChatItemCard.styled";
import { Avatar } from "@components/Avatar/Avatar";
import { Chat } from "types/Chat";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { useCallback } from "react";
import { fetchChatData } from "rdx/slices/chatSlice";
import { fetchSelectedUserData } from "rdx/slices/usersSlice";
import { useNavigate } from "react-router-dom";
import { useUnreadMessages } from "hooks/chat/useUreadMessages";




interface ChatItemCardProps {
    chatItemData: Chat;
    isChatWithNewMessages: boolean;
}


export const ChatItemCard:React.FC<ChatItemCardProps> = ({chatItemData, isChatWithNewMessages}) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const myData = useAppSelector(state => state.userData.user)

    const { markChatAsRead, areUnreadMessages } = useUnreadMessages(myData)

    const { user, lastMessage, chatId } = chatItemData
    const { userId, userName, userFullname, userAvatar } = user

    const isLastMessage = lastMessage.senderName 
    ? `${lastMessage.senderName}: ${lastMessage.text}` 
    : 'no messages yet'



    const onCardClickHandler = useCallback(() => {
        dispatch(fetchSelectedUserData(userId))
        .then(() => dispatch(fetchChatData(chatId))) 
        .then(async() => {
            if (isChatWithNewMessages) {
                await markChatAsRead(chatId)
            }
        })
        .then(() => navigate(`/myChats/${userFullname}/chat`))
    }, [dispatch, chatId, isChatWithNewMessages])



    return (
        <ChatCard 
            onClick={onCardClickHandler} 
            $new={isChatWithNewMessages}
        >
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
                        {isLastMessage}
                    </MessageText>
                </MessageInfo>
            </CardContent>
            <Icon 
                icon={<MdDoubleArrow/>} 
                iconSize="30px" 
                iconColor={theme.colors.regular}
            /> 
            {isChatWithNewMessages && (
                <Badge>
                    <BadgeText>
                        new messages
                    </BadgeText>
                </Badge>
            )}
        </ChatCard>
    )
}
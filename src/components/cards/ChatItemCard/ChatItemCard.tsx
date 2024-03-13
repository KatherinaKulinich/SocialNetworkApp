import { MdDoubleArrow } from "react-icons/Md";
import { Icon } from "../../icons/Icon";
import { theme } from "@styles/Theme";
import { CardContent, ChatCard, MessageInfo, MessageText, UserName } from "./ChatItemCard.styled";
import { Avatar } from "@components/Avatar/Avatar";
import { Chat } from "types/Chat";
import { useAppDispatch } from "hooks/hooks";
import { useCallback } from "react";
import { fetchChatData } from "rdx/slices/chatSlice";
import { fetchSelectedUserData } from "rdx/slices/usersSlice";
import { useNavigate } from "react-router-dom";


interface ChatItemCardProps {
    chatItemData: Chat;
}


export const ChatItemCard:React.FC<ChatItemCardProps> = ({chatItemData}) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const { user, lastMessage, chatId } = chatItemData
    const { userId, userName, userFullname, userAvatar } = user

    const isLastMessage = lastMessage.senderName 
    ? `${lastMessage.senderName}: ${lastMessage.text}` 
    : 'no messages yet'


    const onCardClickHandler = useCallback(() => {
        dispatch(fetchSelectedUserData(userId))
        .then(() => {
            dispatch(fetchChatData(chatId))
        })
        .then(() => {
            navigate(`/myChats/${userFullname}/chat`)
        })
    }, [dispatch])



    return (
        <ChatCard onClick={onCardClickHandler}>
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
                iconSize="40px" 
                iconColor={theme.colors.regular}
            /> 
        </ChatCard>
    )
}
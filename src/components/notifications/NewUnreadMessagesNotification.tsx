import { useUnreadMessages } from "hooks/chat/useUreadMessages";
import { Notification } from "./components/Notification";
import { HiChatBubbleLeftRight } from "react-icons/Hi2";
import { useMyFullData } from "hooks/useMyFullData";
import { useAppSelector } from "hooks/hooks";
import { useEffect, useState } from "react";

interface NewUnreadMessagesNotificationProps {
    chatsAmount: number;
}

export const NewUnreadMessagesNotification:React.FC<NewUnreadMessagesNotificationProps> = ({chatsAmount}) => {
    const notificationText = `You have new unread messages in ${chatsAmount} ${chatsAmount === 1 ? 'chat' : 'chats'}`

    useEffect(() => {
        console.log('chatsAmount', chatsAmount);
        
    }, [chatsAmount])


    return (
        <Notification 
            text={notificationText}
            title="New messages" 
            icon={<HiChatBubbleLeftRight />}
            place={'bottomRight'}
        />
    )
}
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
    // const myData = useAppSelector(state => state.userData.user)
    // const { areUnreadMessages } = useUnreadMessages(myData)

    const notificationText = `You have new unread messages in ${chatsAmount} ${chatsAmount === 1 ? 'chat' : 'chats'}`

    useEffect(() => {
        console.log('chatsAmount', chatsAmount);
        
    }, [chatsAmount])

    // const [notificationText, setNotificationText]= useState<string>('')

    // useEffect(() => {
    //     if (areUnreadMessages.length > 0) {

    //         const chatAmount = areUnreadMessages.length
    //         setNotificationText(`You have new unread messages in ${areUnreadMessages.length} ${areUnreadMessages.length === 1 ? 'chat' : 'chats'}`)
    //     }
    // }, [areUnreadMessages])


    return (
        <Notification 
            text={notificationText}
            title="New messages" 
            icon={<HiChatBubbleLeftRight />}
            place={'bottomRight'}
        />
    )
}
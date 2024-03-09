import { useEffect, useRef } from "react";
import { ChatMessageItem } from "types/ChatMessage";
import { Container, MessageInfo, SenderName, TextBubble,Time, Text } from "./Message.styled"
import { Avatar } from "@components/Avatar/Avatar";
import { UserProfile } from 'types/UserProfile';
import { useAppSelector } from "hooks/hooks";

interface MessageProps {
    message: ChatMessageItem;
    sender: 'me' | 'friend'
}



export const Message:React.FC<MessageProps> = ({message, sender}) => {
    const {messageText, messageImg, createdAt } = message;

    const user:UserProfile = useAppSelector(state => state.users.selectedUser);
    const { userName } = user.personalData ?? {}
    const { userAvatar } = user.profileData ?? {}


    const getMessageTime = (date:number) => {
        return `${new Date(date).getHours()}:${new Date(date).getMinutes()}`
    }

    const ref = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if (ref?.current) {
            ref.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [message]);

    return (
        <Container 
            $sender={sender} 
            ref={ref}
        >
            <TextBubble $sender={sender}>
                <SenderName>
                    {userName}
                </SenderName>
                <Text>
                    {messageText}
                </Text>
            </TextBubble>
            <MessageInfo>
                <Avatar 
                    photo={userAvatar} 
                    size="30px" 
                    border="FFF"
                />
                <Time>
                    {getMessageTime(createdAt)}
                </Time>
            </MessageInfo>
        </Container>
    )
}
import { useEffect, useRef } from "react";
import { ChatMessageItem } from "types/ChatMessage";
import { Container, MessageInfo, SenderName, TextBubble,Time, Text, ImageBox } from "./Message.styled"
import { Avatar } from "@components/Avatar/Avatar";
import { UserProfile } from 'types/UserProfile';
import { useAppSelector } from "hooks/hooks";
import { theme } from "@styles/Theme";

interface MessageProps {
    message: ChatMessageItem;
    sender: 'me' | 'friend'
}



export const Message:React.FC<MessageProps> = ({message, sender}) => {
    const {messageText, messageImg, createdAt } = message;

    const user:UserProfile = useAppSelector(state => state.users.selectedUser);
    const { userName } = user.personalData ?? {}
    const { userAvatar } = user.profileData ?? {}
    
    const myData: UserProfile = useAppSelector(state => state.userData.user)
    const { userName:myName } = myData.personalData ?? {}
    const { userAvatar:myAvatar } = myData.profileData ?? {}


    const getMessageTime = (date:number) => {
        const min = new Date(date).getMinutes()
        const minFormat = min < 9 ?`0${min}` : min;
        const hours = new Date(date).getHours()

        return `${hours}:${minFormat}`
    }

    const ref = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if (ref?.current) {
            ref.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [message]);

    const name = sender === 'me' ? myName : userName
    const avatar = sender === 'me' ? myAvatar : userAvatar

    return (
        <Container 
            $sender={sender} 
            ref={ref}
        >
            <TextBubble $sender={sender}>
                <SenderName>
                    {name}
                </SenderName>
                <Text>
                    {messageText}
                </Text>
                {messageImg && (
                    <ImageBox src={messageImg}/>
                )}
            </TextBubble>
            <MessageInfo>
                <Avatar 
                    photo={avatar} 
                    size="26px" 
                    border={theme.colors.white}
                />
                <Time>
                    {getMessageTime(createdAt)}
                </Time>
            </MessageInfo>
        </Container>
    )
}
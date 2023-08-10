import { Container, MessageInfo, SenderName, TextBubble,Time, Text } from "./Message.styled"
import { Avatar } from "@components/Avatar/Avatar";

interface MessageProps {
    sender: string;
    userName: string;
    messageText: string;
    avatar: string;
    time: string;
}


export const Message:React.FC<MessageProps> = ({sender, userName, messageText, avatar, time}) => {
    return (
        <Container $sender={sender}>
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
                    photo={avatar} 
                    size="30px" 
                    border="FFF"
                />
                <Time>
                    {time}
                </Time>
            </MessageInfo>
        </Container>
    )
}
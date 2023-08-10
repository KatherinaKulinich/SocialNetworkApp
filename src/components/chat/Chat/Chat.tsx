import { ChatHeader } from "../components/ChatHeader/ChatHeader"
import { MessageInput } from "../components/MessageInput/MessageInput"
import { Message } from "../components/Message/Message"
import user1 from '@images/userTest.jpg'
import user2 from '@images/user2.jpg'
import { useState } from "react"
import { ImageErrorMessage } from "@components/ImageErrorMessage/ImageErrorMessage"
import { theme } from "@styles/Theme"
import emptyChat from '@images/emptyChat.svg'
import { Container, ContainerBackground, MessagesContainer, MessageRow, EmptyChatMessage, Text } from "./Chat.styled"
import { RegularButton } from "@components/buttons/RegularButton/RegularButton"
import { backgrounds } from "utils/backgrounds";








export const Chat:React.FC = () => {
    const [messages, setMessages] = useState(['1'])

    return (
        <Container>
            <ChatHeader/>
            <ContainerBackground $url={backgrounds[0].url}>
                {messages.length > 0 ? (
                    <MessagesContainer>
                        <MessageRow $sender="me">
                            <Message sender="me" userName="Vika Petrova" avatar={user1} messageText={"BlaBlaBla"} time={"12:34"}/>
                        </MessageRow>
                        <MessageRow $sender="">
                            <Message sender="" userName="Pavel Ivanov" avatar={user2} messageText={"Hello!!"} time={"12:36"}/>
                        </MessageRow>
                        <MessageRow $sender="me">
                            <Message sender="me" userName="Vika Petrova" avatar={user1} messageText={"How is it going?"} time={"12:39"}/>
                        </MessageRow>
                        <MessageRow $sender="">
                            <Message sender="" userName="Pavel Ivanov" avatar={user2} messageText={"Haven't seen you for a long time!"} time={"12:42"}/>
                        </MessageRow>
                        <MessageRow $sender="me">
                            <Message sender="me" userName="Vika Petrova" avatar={user1} messageText={"BlaBlaBla BlaBlaBla BlaBlaBla BlaBlaBla BlaBlaBla BlaBlaBla"} time={"12:45"}/>
                        </MessageRow>
                        <MessageRow $sender="">
                            <Message sender="" userName="Pavel Ivanov" avatar={user2} messageText={"Good bye BlaBlaBla BlaBlaBla BlaBlaBla BlaBlaBla BlaBlaBla BlaBlaBla BlaBlaBla BlaBlaBla BlaBlaBla BlaBlaBla "} time={"12:47"}/>
                        </MessageRow>
                        <MessageRow $sender="me">
                            <Message sender="me" userName="Vika Petrova" avatar={user1} messageText={"How is it going?"} time={"12:39"}/>
                        </MessageRow>
                        <MessageRow $sender="">
                            <Message sender="" userName="Pavel Ivanov" avatar={user2} messageText={"Haven't seen you for a long time!"} time={"12:42"}/>
                        </MessageRow>
                        <MessageRow $sender="me">
                            <Message sender="me" userName="Vika Petrova" avatar={user1} messageText={"BlaBlaBla BlaBlaBla BlaBlaBla BlaBlaBla BlaBlaBla BlaBlaBla"} time={"12:45"}/>
                        </MessageRow>
                        <MessageRow $sender="">
                            <Message sender="" userName="Pavel Ivanov" avatar={user2} messageText={"Good bye"} time={"12:47"}/>
                        </MessageRow>
                        <MessageRow $sender="me">
                            <Message sender="me" userName="Vika Petrova" avatar={user1} messageText={"How is it going?"} time={"12:39"}/>
                        </MessageRow>
                    </MessagesContainer>
                ) : (
                    <EmptyChatMessage>
                        <ImageErrorMessage 
                            image={emptyChat} 
                            text="You don't have any messages with anna yet"
                        />
                        <Text>
                            Say hello to Anna right now!
                        </Text>
                        <RegularButton 
                            buttonText="Say hello" 
                            buttonType="button"
                        />
                    </EmptyChatMessage>
                )}
            </ContainerBackground>
            <MessageInput role="message"/>
        </Container>
    )
}
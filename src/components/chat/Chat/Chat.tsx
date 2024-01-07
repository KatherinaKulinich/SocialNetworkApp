import user1 from '@images/userTest.jpg'
import user2 from '@images/user2.jpg'
import emptyChat from '@images/emptyChat.svg'
import { ChatHeader } from "../components/ChatHeader/ChatHeader"
import { MessageInput } from "../components/MessageInput/MessageInput"
import { Message } from "../components/Message/Message"
import { useCallback, useEffect, useState } from "react"
import { ImageErrorMessage } from "@components/ImageErrorMessage/ImageErrorMessage"
import { Container, ContainerBackground, MessagesContainer, MessageRow, EmptyChatMessage, Text } from "./Chat.styled"
import { RegularButton } from "@components/buttons/RegularButton/RegularButton"
import { backgrounds } from "utils/data/backgrounds"
import { useAppSelector } from "hooks/hooks"





export const Chat:React.FC = () => {
    const [messages, setMessages] = useState(['1'])
    const [bgUrl, setBgUrl] = useState('')

    const userData = useAppSelector(state => state.userData.user)
    const { chatBackground } = userData.additionalData

    const getUserBgImage = useCallback(() => {
        backgrounds.map((img) => {
            if (chatBackground === img.value) {
                return setBgUrl(img.url)
            }
        })
    }, [backgrounds, chatBackground, bgUrl])


    useEffect(() => {
        getUserBgImage()
    }, [backgrounds, chatBackground, bgUrl])

    const [messageValue, setMessageValue] = useState('')
    const onChangeMessageValue:React.ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
        setMessageValue(event.target.value)
    }, [])

    const sendNewMessage = useCallback(() => {}, [])

    
 
    
    return (
        <Container>
            <ChatHeader/>
            <ContainerBackground $url={bgUrl}>
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
            <MessageInput 
                role="message" 
                inputValue={messageValue} 
                onChangeInputValue={onChangeMessageValue} 
                onSubmitText={sendNewMessage}
            />
        </Container>
    )
}
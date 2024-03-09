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
import { UserProfile } from 'types/UserProfile'


interface ChatProps {
    user: UserProfile
}


export const Chat:React.FC<ChatProps> = ({user}) => {
    const {userName} = user?.personalData

    const chatMessages = useAppSelector(state => state.chat.chat)
    const [bgUrl, setBgUrl] = useState('')

    const myData = useAppSelector(state => state.userData.user)
    const { chatBackground } = myData?.additionalData ?? {}
    const { userId:myId }= myData?.personalData

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

    const getMessageSender = (id: string) => {
        if (myId === id) {
            return 'me'
        }
        return 'friend'
    }

    
 
    
    return (
        <Container>
            <ChatHeader user={user}/>
            <ContainerBackground $url={bgUrl}>
                {chatMessages?.length > 0 ? (
                    <MessagesContainer>
                        {chatMessages.map((item) => (
                            <MessageRow $sender={getMessageSender(item.senderId)}>
                                <Message 
                                    sender={getMessageSender(item.senderId)} 
                                    message={item}
                                    key={item.messageId}
                                />
                            </MessageRow>
                        ))}
                    </MessagesContainer>
                ) : (
                    <EmptyChatMessage>
                        <ImageErrorMessage 
                            image={emptyChat} 
                            text={`You don't have any messages with ${userName} yet`}
                        />
                        <Text>
                            {`Say hello to ${userName} right now!`}
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
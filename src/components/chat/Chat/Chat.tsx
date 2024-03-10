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
import { useChatChecking } from 'hooks/chat/useChatChecking'
import { useMessageSending } from 'hooks/chat/useMessageSending'
import EmojiPicker from 'emoji-picker-react';


interface ChatProps {
    user: UserProfile
}


export const Chat:React.FC<ChatProps> = ({user}) => {
    const chatMessages = useAppSelector(state => state.chat.chat)

    const myData = useAppSelector(state => state.userData.user)
    const { userId:myId }= myData?.personalData
    const { userName, userId } = user?.personalData ?? {}

    const { isSelectedChat, getChatWithUser } = useChatChecking(user)

    useEffect(() => {
        if (user) {
            getChatWithUser(myData.chats, userId)
        }
    }, [myData.chats, user])


    const [bgUrl, setBgUrl] = useState('')
    const { chatBackground } = myData?.additionalData ?? {}

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



    const [messageText, setMessageText] = useState<string>('')
    const [messageImg, setMessageImg] = useState<File | null>(null)

    const onChangeMessageText:React.ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
        setMessageText(event.target.value)
    }, [messageText])

    const onChangeMessageImg:React.ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
        if (!event?.currentTarget?.files) return;

        const img = event?.currentTarget?.files[0]
        setMessageImg(img)
    }, [messageImg])

    const { sendNewMessage } = useMessageSending(isSelectedChat, user, myData)

    const onSubmitForm = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        
        if (isSelectedChat && messageText || messageImg) {
            sendNewMessage(messageImg, messageText, isSelectedChat)
            setMessageText('')
            setMessageImg(null)
        }
    }, [messageImg, messageText, isSelectedChat])


    const getMessageSender = (id: string) => {
        if (myId === id) {
            return 'me'
        }
        return 'friend'
    }


    const sayHelloToUser = useCallback(() => {
        if (isSelectedChat) {
            sendNewMessage(messageImg, `Hello, ${userName}! 👋🏼`, isSelectedChat)
        }
    }, [isSelectedChat])


    
    return (
        <Container>
            <ChatHeader user={user}/>
            <ContainerBackground $url={bgUrl}>
                {/* <EmojiPicker 
                    onEmojiClick={(event) => console.log(event.emoji)}
                    open={true}
                    theme="dark"
                /> */}
                {chatMessages?.length > 0 ? (
                    <MessagesContainer>
                        {chatMessages.map((item) => (
                            <MessageRow 
                                $sender={getMessageSender(item.senderId)}
                                key={item.messageId}
                            >
                                <Message 
                                    sender={getMessageSender(item.senderId)} 
                                    message={item}
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
                            buttonText="Say hello 👋🏼" 
                            buttonType="button"
                            onClickHandler={sayHelloToUser}
                        />
                    </EmptyChatMessage>
                )}
            </ContainerBackground>
            <MessageInput 
                role="message" 
                inputValue={messageText}
                fileValue={messageImg}
                onChangeInputValue={onChangeMessageText} 
                onChangeFileValue={onChangeMessageImg}
                onSubmitText={onSubmitForm}
            />
        </Container>
    )
}
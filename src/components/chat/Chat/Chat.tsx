import emptyChat from '@images/emptyChat.svg'
import { ChatHeader } from "../components/ChatHeader/ChatHeader"
import { MessageInput } from "../components/MessageInput/MessageInput"
import { Message } from "../components/Message/Message"
import { useCallback, useEffect, useState } from "react"
import { ImageErrorMessage } from "@components/ImageErrorMessage/ImageErrorMessage"
import { Container, ContainerBackground, MessagesContainer, MessageRow, EmptyChatMessage, Text } from "./Chat.styled"
import { RegularButton } from "@components/buttons/RegularButton/RegularButton"
import { backgrounds } from "utils/data/backgrounds"
import { useAppDispatch, useAppSelector } from "hooks/hooks"
import { UserProfile } from 'types/UserProfile'
import { useChatChecking } from 'hooks/chat/useChatChecking'
import { useMessageSending } from 'hooks/chat/useMessageSending'
import { EmojiPopup } from '@components/popups/Emoji/EmojiPopup'
import { MouseDownEvent } from 'emoji-picker-react/dist/config/config';
import { fetchInputFocusData } from 'rdx/slices/chatSlice'
import { TypingAnimation } from '@components/animations/TypingAnimation/TypingAnimation'
import { useUnreadMessages } from 'hooks/chat/useUreadMessages'
import { ChatMessageItem } from 'types/ChatMessage'
import { BackgroundSettingsDrawer } from '../components/Drawers/BackgroundSettingsDrawer/BackgroundSettingsDrawer'
import { MediaFilesDrawer } from '../components/Drawers/MediaFilesDrawer/MediaFilesDrawer'


interface ChatProps {
    user: UserProfile
}


export const Chat:React.FC<ChatProps> = ({user}) => {
    const dispatch = useAppDispatch()
    const chatMessages = useAppSelector(state => state.chat.chat)

    const myData = useAppSelector(state => state.userData.user)
    const { userId:myId }= myData?.personalData
    const { userName, userId } = user?.personalData ?? {}


    const { isSelectedChat, getChatWithUser } = useChatChecking(user)

    
    const { sendNewMessage, isImageLoading } = useMessageSending(isSelectedChat, user, myData)
    const { markChatAsRead } = useUnreadMessages(myData)

    useEffect(() => {
        markChatAsRead(isSelectedChat.chatId)
    }, [chatMessages])

    useEffect(() => {
        if (user) {
            getChatWithUser(myData.chats, userId)
        }
    }, [myData.chats, user])


    //bg
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


    //message
    const [messageText, setMessageText] = useState<string>('')
    const [messageImg, setMessageImg] = useState<File | null>(null)

    const onChangeMessageText:React.ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
        setIsEmojiiPickerOpen(false)
        setMessageText(event.target.value)
    }, [messageText])

    const onChangeMessageImg:React.ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
        if (!event?.currentTarget?.files) return;

        const img = event?.currentTarget?.files[0]
        setMessageImg(img)
    }, [messageImg])

    const onSubmitForm = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        
        if (isSelectedChat && messageText || messageImg) {
            sendNewMessage(messageImg, messageText, isSelectedChat)
            setMessageText('')
            setMessageImg(null)
            setIsEmojiiPickerOpen(false)
        }
    }, [messageImg, messageText, isSelectedChat, user])

    const sayHelloToUser = useCallback(() => {
        if (isSelectedChat) {
            sendNewMessage(messageImg, `Hello, ${userName}! 👋🏼`, isSelectedChat)
        }
    }, [isSelectedChat, user])


    //emoji
    const [isEmojiPickerOpen, setIsEmojiiPickerOpen] = useState<boolean>(false)

    const onToggleEmojiiPicker = useCallback(() => {
        setIsEmojiiPickerOpen(prev => !prev)
    }, [isEmojiPickerOpen])

    const addEmojiToMessage: MouseDownEvent = useCallback((event) => {
        setMessageText(prev => prev.concat(event.emoji))
        onToggleEmojiiPicker()
    }, [messageText])



    //drawer
    const [isDrawerMediaOpen, setIsDrawerMediaOpen] = useState(false)

    const onOpenDrawerMedia = useCallback(() => {
        setIsDrawerMediaOpen(true)
    }, [isDrawerMediaOpen])
    const onCloseDrawerMedia = useCallback(() => {
        setIsDrawerMediaOpen(false)
    }, [isDrawerMediaOpen])


    const [isDrawerSettingsOpen, setIsDrawerSettingsOpen] = useState(false)

    const onOpenDrawerSettings = useCallback(() => {
        setIsDrawerSettingsOpen(true)
    }, [isDrawerSettingsOpen])
    const onCloseDrawerSettings = useCallback(() => {
        setIsDrawerSettingsOpen(false)
    }, [isDrawerSettingsOpen])



    //userIsTyping
    useEffect(() => {
        if (isSelectedChat.chatId) {
            dispatch(fetchInputFocusData(isSelectedChat.chatId, userId))
        }
    }, [isSelectedChat.chatId])

    const userIsTyping = useAppSelector(state => state.chat.userIsTyping)



    const getMessageSender = (id: string) => {
        if (myId === id) {
            return 'me'
        }
        return 'friend'
    }


    
    return (
        <>
            <Container>
                <ChatHeader 
                    user={user} 
                    onOpenDrawerMedia={onOpenDrawerMedia} 
                    onOpenDrawerSettings={onOpenDrawerSettings} 
                    chatId={isSelectedChat.chatId}
                />
                <ContainerBackground $url={bgUrl}>
                    {chatMessages?.length > 0 ? (
                        <MessagesContainer $isUserTyping={userIsTyping}>
                            {chatMessages.map((item:ChatMessageItem ) => (
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
                    {userIsTyping && <TypingAnimation/>}
                    <EmojiPopup
                        popupIsOpen={isEmojiPickerOpen}
                        getEmoji={addEmojiToMessage}
                        role='chat'
                    />
                    <BackgroundSettingsDrawer
                        isOpen={isDrawerSettingsOpen}
                        onOpen={onOpenDrawerSettings}
                        onClose={onCloseDrawerSettings}
                        user={user}
                        chatId={isSelectedChat.chatId}
                    />
                    <MediaFilesDrawer
                        isOpen={isDrawerMediaOpen}
                        onOpen={onOpenDrawerMedia}
                        onClose={onCloseDrawerMedia}
                        user={user}
                        chatId={isSelectedChat.chatId}
                    />
                </ContainerBackground>
                <MessageInput 
                    role="message" 
                    inputValue={messageText}
                    fileValue={messageImg}
                    onChangeInputValue={onChangeMessageText} 
                    onChangeFileValue={onChangeMessageImg}
                    onSubmitText={onSubmitForm}
                    onToggleEmoji={onToggleEmojiiPicker}
                    isImageLoading={isImageLoading}
                    chatId={isSelectedChat.chatId}
                    isEmojiPickerOpen={isEmojiPickerOpen}
                />
            </Container>   
        </>
    )
}
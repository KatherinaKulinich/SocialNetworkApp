import { useCallback } from "react";
import { IconButton, MessageField, MessageForm, SendButton, MessageText } from "./MessageInput.styled"
import { Icon } from '@components/icons/Icon';
import { BsEmojiSmile } from "react-icons/Bs"
import { MdOutlineImageSearch, MdSend} from "react-icons/Md"
import { FaFileCircleCheck } from "react-icons/fa6";
import { LoaderRing } from "@components/loaders/LoaderRing";
import { doc, updateDoc } from "firebase/firestore";
import { useAppSelector } from "hooks/hooks"
import { db } from "firebase";


interface MessageInputProps {
    role: "comment" | 'message';
    inputValue: string;
    onChangeInputValue: React.ChangeEventHandler<HTMLInputElement>;
    onSubmitText: (event: React.FormEvent<HTMLFormElement>) => void;
    fileValue?: File | null;
    onChangeFileValue?: React.ChangeEventHandler<HTMLInputElement>;
    onToggleEmoji: () => void;
    isImageLoading?: boolean;
    chatId?: string;
}




export const MessageInput:React.FC<MessageInputProps> = (
    {role, inputValue, onChangeInputValue, onSubmitText, fileValue, onChangeFileValue, onToggleEmoji, isImageLoading, chatId}) => {

    const myData = useAppSelector(state => state.userData.user)
    const myId = myData?.personalData?.userId


    const getImageIcon = useCallback(() => {
        if (!fileValue) {
            return (
                <>
                    <input
                        name="file"
                        type="file"
                        style={{ display: "none" }}
                        id="file"
                        onChange={onChangeFileValue}
                    />
                    <label htmlFor="file">
                        <IconButton>
                            <Icon 
                                icon={<MdOutlineImageSearch/>} 
                                iconSize="20px" 
                                iconColor='bebebe'
                            /> 
                        </IconButton>
                    </label>
                </>
            )
        } else {
            return (
                <Icon 
                    icon={<FaFileCircleCheck/>} 
                    iconSize="20px" 
                    iconColor='green'
                /> 
            )
        }
    }, [fileValue])


    const objField = `userIsTyping.${myId}`
    
    const onInputFocus = useCallback(async () => {
        if (chatId) {
            const chatRef = doc(db, 'chats', chatId)

            await updateDoc(chatRef, {
                [objField]: true,
            })
        }
    }, [chatId])

    const onInputBlur = useCallback(async () => {
         if (chatId) {
            const chatRef = doc(db, 'chats', chatId)
            await updateDoc(chatRef, {
                [objField]: false,
            })
        }
    }, [chatId])
    



    return (
        <>
        <MessageForm 
            name="messageForm" 
            method="post" 
            onSubmit={(e:React.FormEvent<HTMLFormElement>) => onSubmitText(e)}
        >
            <MessageField 
                onFocus={onInputFocus} 
                onBlur={onInputBlur}
            > 
                <IconButton onClick={onToggleEmoji}>
                    <Icon 
                        icon={<BsEmojiSmile/>} 
                        iconSize="15px" 
                        iconColor='bebebe'
                    /> 
                </IconButton>
                <MessageText 
                    name="messageInput"
                    placeholder='message text...'
                    value={inputValue}
                    onChange={onChangeInputValue}
                />
                {role === 'message' && getImageIcon()}
            </MessageField>
            <SendButton 
                type="submit" 
                disabled={isImageLoading}
            >
                {isImageLoading ? (
                    <LoaderRing size={32}/>
                ) : (
                    <Icon 
                        icon={<MdSend/>} 
                        iconSize="30px" 
                        iconColor='bebebe'
                    /> 
                )}
            </SendButton>
        </MessageForm>
        </>
    )
}
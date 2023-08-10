import { IconButton, MessageField, MessageForm, SendButton, MessageText } from "./MessageInput.styled"
import { Icon } from '@components/icons/Icon';
import { BsEmojiSmile } from "react-icons/Bs"
import { MdOutlineImageSearch, MdSend} from "react-icons/Md"

interface MessageInputProps {
    role: "comment" | 'message';
}

export const MessageInput:React.FC<MessageInputProps> = ({role}) => {
    return (
        <MessageForm>
            <MessageField>
                <IconButton>
                    <Icon 
                        icon={<BsEmojiSmile/>} 
                        iconSize="25px" 
                        iconColor='bebebe'
                    /> 
                </IconButton>
                <MessageText placeholder='message text...'/>
                {role === "message" && (
                    <IconButton>
                        <Icon 
                            icon={<MdOutlineImageSearch/>} 
                            iconSize="25px" 
                            iconColor='bebebe'
                        /> 
                    </IconButton>
                )}
            </MessageField>
            <SendButton>
                <Icon 
                    icon={<MdSend/>} 
                    iconSize="40px" 
                    iconColor='bebebe'
                /> 
            </SendButton>
        </MessageForm>
    )
}
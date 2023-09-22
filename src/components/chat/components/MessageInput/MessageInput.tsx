import { IconButton, MessageField, MessageForm, SendButton, MessageText } from "./MessageInput.styled"
import { Icon } from '@components/icons/Icon';
import { BsEmojiSmile } from "react-icons/Bs"
import { MdOutlineImageSearch, MdSend} from "react-icons/Md"

interface MessageInputProps {
    role: "comment" | 'message';
    inputValue: string;
    onChangeInputValue:React.ChangeEventHandler<HTMLInputElement>
    onSubmitText: (value:any) => void;
 }

export const MessageInput:React.FC<MessageInputProps> = ({role, inputValue, onChangeInputValue, onSubmitText}) => {
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
                <MessageText 
                    placeholder='message text...'
                    value={inputValue}
                    onChange={onChangeInputValue}
                />
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
            <SendButton onClick={onSubmitText}>
                <Icon 
                    icon={<MdSend/>} 
                    iconSize="40px" 
                    iconColor='bebebe'
                /> 
            </SendButton>
        </MessageForm>
    )
}
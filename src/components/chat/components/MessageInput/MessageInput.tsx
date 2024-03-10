import { IconButton, MessageField, MessageForm, SendButton, MessageText } from "./MessageInput.styled"
import { Icon } from '@components/icons/Icon';
import { BsEmojiSmile } from "react-icons/Bs"
import { MdOutlineImageSearch, MdSend} from "react-icons/Md"
import { FaFileCircleCheck } from "react-icons/fa6";


interface MessageInputProps {
    role: "comment" | 'message';
    inputValue: string;
    onChangeInputValue: React.ChangeEventHandler<HTMLInputElement>;
    onSubmitText: (event: React.FormEvent<HTMLFormElement>) => void;
    fileValue?: File | null;
    onChangeFileValue?: React.ChangeEventHandler<HTMLInputElement>;
}




export const MessageInput:React.FC<MessageInputProps> = ({role, inputValue, onChangeInputValue, onSubmitText, fileValue, onChangeFileValue}) => {
    
    return (
        <>
        <MessageForm 
            name="messageForm" 
            method="post" 
            onSubmit={(e:React.FormEvent<HTMLFormElement>) => onSubmitText(e)}
        >
            <MessageField>
                <IconButton>
                    <Icon 
                        icon={<BsEmojiSmile/>} 
                        iconSize="25px" 
                        iconColor='bebebe'
                    /> 
                </IconButton>
                <MessageText 
                    name="messageInput"
                    placeholder='message text...'
                    value={inputValue}
                    onChange={onChangeInputValue}
                />
                {role === "message" && !fileValue ? (
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
                                    iconSize="25px" 
                                    iconColor='bebebe'
                                /> 
                            </IconButton>
                        </label>
                    </>
                ) : (
                    <Icon 
                        icon={<FaFileCircleCheck/>} 
                        iconSize="25px" 
                        iconColor='green'
                    /> 
                )}
            </MessageField>
            <SendButton type="submit">
                <Icon 
                    icon={<MdSend/>} 
                    iconSize="30px" 
                    iconColor='bebebe'
                /> 
            </SendButton>
        </MessageForm>
        </>
    )
}
import { Notification } from "./components/Notification";
import { HiChatBubbleLeftRight } from "react-icons/Hi2";


export const NewUnreadMessagesNotification:React.FC = ({}) => {

    return (
        <Notification 
            text={'You have new unread messages!'}
            title="New messages" 
            icon={<HiChatBubbleLeftRight />}
            place={'bottomRight'}
        />
    )
}
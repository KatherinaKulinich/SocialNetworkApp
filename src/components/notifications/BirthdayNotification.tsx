import { GiGlassCelebration } from "react-icons/gi";
import { Notification } from "./components/Notification";

interface BirthdayNotificationProps{
    text: string;
}

export const BirthdayNotification:React.FC<BirthdayNotificationProps> = ({text}) => {
    
    return (
        <Notification 
            text={text} 
            title="Birthday" 
            icon={<GiGlassCelebration/>}
            place="topRight"
        />
    )
}
import { UserProfile } from "types/UserProfile";
import { ChatDrawer } from "../components/ChatDrawer/ChatDrawer"
import { ChatBackground } from "@components/ChatBackgroundSettings/ChatBackground";

interface BackgroundSettingsDrawerProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    user: UserProfile;
    chatId: string;
}

export const BackgroundSettingsDrawer: React.FC<BackgroundSettingsDrawerProps> = ({isOpen, onOpen, onClose, user, chatId}) => {
    return (
        <ChatDrawer
            isOpen={isOpen} 
            onOpen={onOpen} 
            onClose={onClose} 
            user={user} 
            chatId={chatId} 
            title={"Background settings"} 
            drawerContent={<ChatBackground/>}
        />
    )
}
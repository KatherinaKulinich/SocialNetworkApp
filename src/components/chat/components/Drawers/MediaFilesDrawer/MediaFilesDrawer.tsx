import { UserProfile } from "types/UserProfile";
import { ChatDrawer } from "../components/ChatDrawer/ChatDrawer"
import { TwoTabsContainer } from "@components/tabs/TwoTabsContainer";
import { useChatManagement } from "hooks/chat/useChatManagement";
import { useAppSelector } from "hooks/hooks";
import { DrawerFileContainer } from "../../DrawerFileContainer";

interface MediaFilesDrawerProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    user: UserProfile;
    chatId: string;
}



export const MediaFilesDrawer:React.FC<MediaFilesDrawerProps> = ({isOpen, onOpen, onClose, user, chatId}) => {
    const { userName } = user?.personalData ?? {}
    const myData = useAppSelector(state => state.userData.user)

    const { myImagesURLs, userImagesURLs } = useChatManagement(chatId, myData, user) 


    return (
        <ChatDrawer 
            isOpen={isOpen} 
            onOpen={onOpen} 
            onClose={onClose} 
            user={user} 
            chatId={chatId} 
            title={`Media files in chat with ${userName}`} 
            drawerContent={
                <TwoTabsContainer 
                    firstTabName={"My files"} 
                    secondTabName={`${userName}'s files`} 
                    firstTabContent={
                        <DrawerFileContainer files={myImagesURLs}/>
                    } 
                    secondTabContent={
                        <DrawerFileContainer files={userImagesURLs}/>
                    }
                />
            }
        />
    )
}
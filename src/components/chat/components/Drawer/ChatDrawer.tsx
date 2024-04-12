import { TwoTabsContainer } from "@components/tabs/TwoTabsContainer";
import { SubTitle } from "@components/text/Subtitle";
import { UserProfile } from "types/UserProfile";
import { Drawer } from "antd";
import { DrawerContainer } from "./ChatDrawer.styled.";
import { Paragraph } from "@components/text/Paragraph";
import { theme } from "@styles/Theme";
import { useChatManagement } from "hooks/chat/useChatManagement";
import { useAppSelector } from "hooks/hooks"
import { useEffect } from "react";
import { DrawerFileContainer } from "../DrawerFileContainer";


interface ChatDrawerProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    user: UserProfile;
    chatId: string;
}


export const ChatDrawer:React.FC<ChatDrawerProps> = ({isOpen, onOpen, onClose, user, chatId}) => {
    const { userName } = user?.personalData ?? {}
    const myData = useAppSelector(state => state.userData.user)

    const { myImagesURLs, userImagesURLs } = useChatManagement(chatId, myData, user) 
    
 

    return (
        <Drawer
            placement="right"
            closable={true}
            open={isOpen}
            onClose={onClose}
            getContainer={false}
            title={`Media files in chat with ${userName}`}
            contentWrapperStyle={{
                width: '100%',
                maxWidth: '450px'
            }}
            headerStyle={{
                backgroundColor: theme.colors.lightGray, 
                padding: '5px',              
            }}
            bodyStyle={{
                padding: '10px',
            }}
        >
            <DrawerContainer>
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
            </DrawerContainer>
        </Drawer>
    )
}
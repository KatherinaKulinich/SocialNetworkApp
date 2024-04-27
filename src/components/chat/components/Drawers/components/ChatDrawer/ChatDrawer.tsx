import { UserProfile } from "types/UserProfile";
import { Drawer } from "antd";
import { DrawerContainer } from "./ChatDrawer.styled.";
import { theme } from "@styles/Theme";



interface ChatDrawerProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    user: UserProfile;
    chatId: string;
    title: string;
    drawerContent: React.ReactNode
}


export const ChatDrawer:React.FC<ChatDrawerProps> = ({isOpen, onOpen, onClose, user, chatId, drawerContent, title}) => {

    return (
        <Drawer
            placement="right"
            closable={true}
            open={isOpen}
            onClose={onClose}
            getContainer={false}
            title={title}
            contentWrapperStyle={{
                width: '100%',
                maxWidth: '550px'
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
                {drawerContent}
            </DrawerContainer>
        </Drawer>
    )
}
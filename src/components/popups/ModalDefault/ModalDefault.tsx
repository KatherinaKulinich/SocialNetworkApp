import { theme } from "@styles/Theme";
import { Icon } from "@components/icons/Icon";
import { MdClose } from 'react-icons/Md';
import { CloseButton, ModalContainer, ModalTitle } from "./ModalDefault.styled";

interface ModalProps {
    children: React.ReactNode;
    title: string;
    isModalOpen: boolean;
    onCloseModal: () => void;
}



export const ModalDefault:React.FC<ModalProps> = ({children, title, isModalOpen, onCloseModal}) => {
    return (
        <ModalContainer 
            open={isModalOpen} 
            onClose={onCloseModal}
            // maxWidth
            sx={{
                width: 600,
                // maxWidth: 600,
                padding: '20px',
                margin: '10px'
            }}
        >
            <ModalTitle>
                {title}
            </ModalTitle>

            {children}
            
            <CloseButton onClick={onCloseModal}>
                <Icon 
                    icon={<MdClose/>} 
                    iconColor={theme.colors.regular} 
                    iconSize="20px"
                />
            </CloseButton>
        </ModalContainer>
    )
}
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
        >
            <ModalTitle>
                {title}
            </ModalTitle>

            {children}
            
            <CloseButton onClick={onCloseModal}>
                <Icon 
                    icon={<MdClose/>} 
                    iconColor={theme.colors.regular} 
                    iconSize="40px"
                />
            </CloseButton>
        </ModalContainer>
    )
}
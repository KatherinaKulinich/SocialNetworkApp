import { theme } from "@styles/Theme";
import { Icon } from "@components/icons/Icon";
import { MdClose } from 'react-icons/Md';
import { CloseButton} from "./ModalDefault.styled";
import { Dialog,  DialogTitle } from "@mui/material";


interface ModalProps {
    children: React.ReactNode;
    title: string;
    isModalOpen: boolean;
    onCloseModal: () => void;
}



export const ModalDefault:React.FC<ModalProps> = ({children, title, isModalOpen, onCloseModal}) => {

    return (
        <Dialog 
            open={isModalOpen} 
            onClose={onCloseModal}
            fullWidth={true}
            maxWidth={'sm'}
        >
            <DialogTitle
                sx={{color: `${theme.colors.regular}`, 
                fontSize: '12px', 
                textTransform: 'uppercase',
                textAlign: 'center',
            }}    
            >
                {title}
            </DialogTitle>

            {children}
            
            <CloseButton onClick={onCloseModal}>
                <Icon 
                    icon={<MdClose/>} 
                    iconColor={theme.colors.regular} 
                    iconSize="20px"
                />
            </CloseButton>
        </Dialog>
    )
}
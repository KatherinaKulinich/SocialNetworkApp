import { theme } from "@styles/Theme";
import { Icon } from "@components/icons/Icon";
import { MdClose } from 'react-icons/Md';
import { CloseButton, ModalContainer} from "./ModalDefault.styled";
import { DialogProps, DialogTitle, SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { device } from "@styles/Breakpoints";

interface ModalProps {
    children: React.ReactNode;
    title: string;
    isModalOpen: boolean;
    onCloseModal: () => void;
}



export const ModalDefault:React.FC<ModalProps> = ({children, title, isModalOpen, onCloseModal}) => {
    // const [fullWidth, setFullWidth] = useState(true);
    // const [maxWidth, setMaxWidth] = useState<DialogProps['maxWidth']>('sm');

    // const handleMaxWidthChange = (event: SelectChangeEvent<typeof maxWidth>) => {
    //     setMaxWidth(
    //         event.target.value,
    //     );
    // };

    // const handleFullWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setFullWidth(event.target.checked);
    // };
    // const themeAntd = useTheme();
    // const fullScreen = useMediaQuery(themeAntd.breakpoints.down('sm'));


    return (
        <ModalContainer 
            open={isModalOpen} 
            onClose={onCloseModal}
            // fullScreen={fullScreen}
            fullWidth={true}
            maxWidth={'sm'}
            // sx={{padding: '20px'}}
            // sx={{width: 600}}
           
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
        </ModalContainer>
    )
}
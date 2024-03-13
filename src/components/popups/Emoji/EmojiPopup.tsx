import EmojiPicker from 'emoji-picker-react';
import { MouseDownEvent } from 'emoji-picker-react/dist/config/config';
import styled from 'styled-components';


interface EmojiPopupProps {
    popupIsOpen: boolean;
    getEmoji: MouseDownEvent;
    role: 'chat' | 'modal'
}

export const EmojiPopup:React.FC<EmojiPopupProps> = ({popupIsOpen, getEmoji, role}) => {
    return (
        <EmojiContainer $role={role}>
            <EmojiPicker 
                onEmojiClick={getEmoji}
                open={popupIsOpen}
                width={role === 'chat' ? '350px' : '280px'}
                height={role === 'chat' ? '450px' : '370px'}
            />
        </EmojiContainer>
    )
}

const EmojiContainer = styled.div<{$role: string}>`
    position: absolute;
    bottom: ${props => props.$role === 'chat' ? '10px' : '80px'};
    left: 10px;
    z-index: 20;
`


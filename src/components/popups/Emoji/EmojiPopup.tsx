import EmojiPicker from 'emoji-picker-react';
import { MouseDownEvent } from 'emoji-picker-react/dist/config/config';
import { useWindowSize } from 'hooks/useWindowSize';
import styled from 'styled-components';


interface EmojiPopupProps {
    popupIsOpen: boolean;
    getEmoji: MouseDownEvent;
    role: 'chat' | 'modal';
}

export const EmojiPopup:React.FC<EmojiPopupProps> = ({popupIsOpen, getEmoji, role}) => {
    const {width} = useWindowSize();

    return (
        <EmojiContainer $role={role}>
            <EmojiPicker 
                onEmojiClick={getEmoji}
                open={popupIsOpen}
                width={width <= 500 ? '260px' : '320px'}
                height={width <= 500 ? '340px' : '400px'}
                searchDisabled={true}
            />
        </EmojiContainer>
    )
}

const EmojiContainer = styled.div<{$role: string}>`
    position: absolute;
    bottom: ${props => props.$role === 'chat' ? '10px' : '80px'};
    left: 20px;
    z-index: 50;
`


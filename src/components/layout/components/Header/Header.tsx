import { Logo } from '@components/Logo/Logo'
import { BsThreeDotsVertical } from 'react-icons/Bs'
import { MdOutlineClose } from 'react-icons/Md'
import { useWindowSize } from '../../../../hooks/useWindowSize';
import { HeaderSection, HeaderContainer, HeaderText } from './Header.styled';
import { Wrapper } from '../Wrapper/Wrapper';
import { IconButton } from '@components/buttons/IconButton/IconButton';




interface HeaderProps {
    isPopupOpen?: boolean;
    isMainLayout: boolean;
    onOpenPopup?: () => void;
    onClosePopup?: () => void;
}


export const Header:React.FC<HeaderProps> = (
    {isPopupOpen, isMainLayout, onOpenPopup, onClosePopup}) => {
        
    const {width} = useWindowSize()

    return (
        <HeaderSection>
            <Wrapper>
                <HeaderContainer>
                    <Logo/>

                    {isMainLayout ? width >= 1024 ? (
                        <HeaderText>
                            Be in touch!
                        </HeaderText>
                    ) : isPopupOpen ? (
                        <IconButton 
                            icon={<MdOutlineClose/>} 
                            color='#FFF' 
                            size='30px' 
                            type='button' 
                            onClickHandler={onClosePopup}
                        />
                    ) : (
                        <IconButton 
                            icon={<BsThreeDotsVertical/>} 
                            color='#FFF' 
                            size='30px' 
                            type='button' 
                            onClickHandler={onOpenPopup}
                        />
                    ) : (
                        <HeaderText>
                            Be in touch!
                        </HeaderText>
                    )}
                </HeaderContainer>
            </Wrapper>
        </HeaderSection>
    )
}





import logoImg from '@images/logo2.svg'
import { 
    LogoContainer, 
    LogoIcon, 
    NameContainer, 
    TextContainer, 
    TextMain, 
    TextSecondary 
} from "./Logo.styled"




export const Logo:React.FC = () => {
    return (
            <LogoContainer>
                <LogoIcon 
                    src={logoImg} 
                    alt='logo'
                />
                <TextContainer>
                    <TextMain>
                        Awesome
                    </TextMain>
                    <NameContainer>
                        <TextSecondary>
                            Social
                        </TextSecondary>
                        <TextSecondary>
                            Network
                        </TextSecondary>
                    </NameContainer>
                    <TextMain>
                        App
                    </TextMain>
                </TextContainer>
            </LogoContainer>
    )
}
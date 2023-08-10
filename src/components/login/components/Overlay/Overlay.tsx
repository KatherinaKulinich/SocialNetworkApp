import { OverlayContainer, RightOverlayPanel, LeftOverlayPanel, Overlay } from "./Overlay.styled"
import LoginImage from '@images/login.svg'
import SignUpImage from '@images/signup.svg'
import { OverlayOnePanel } from "./OverlayPanel";


interface OverlayPanelProps {
    login: boolean;
    onToggleLogin: () => void
    onToggleSignup: () => void
}



export const OverlayPanel:React.FC<OverlayPanelProps> = ({login, onToggleLogin, onToggleSignup}) => {

    return (
        <OverlayContainer $login={login}>
            <Overlay $login={login}>

                <LeftOverlayPanel $login={login}> 
                    <OverlayOnePanel 
                        text={"Do you have an account?"} 
                        buttonText={"Log in"} 
                        onToogleOverlay={onToggleLogin} 
                        isLogin={login} 
                        imagePath={LoginImage} 
                        imageAlt={"login illustration"}
                    />                   
                </LeftOverlayPanel>

                <RightOverlayPanel $login={login}>
                    <OverlayOnePanel 
                        text={"Don't have an account?"} 
                        buttonText={"Sign up"} 
                        onToogleOverlay={onToggleSignup} 
                        isLogin={login} 
                        imagePath={SignUpImage} 
                        imageAlt={"sign up illustration"}
                    /> 
                </RightOverlayPanel>

            </Overlay>
        </OverlayContainer>
    )
}
import { useCallback, useState } from "react";
import { LoginFormDesktop } from "../components/forms/loginForm/LoginFormDesktop";
import { SignUpFormDesktop } from "../components/forms/signupForm/SignUpFormDesktop";
import { Container } from "./LogContainerDesktop.styled";
import { OverlayPanel } from "../components/Overlay/Overlay";



export const LogContainerDesktop:React.FC = () => {
    const [isLogin, setIsLogin] = useState(true)

    const onToggleLoginForm = useCallback(() => {
        setIsLogin(true)
    }, [])
    const onToggleSignupForm = useCallback(() => {
        setIsLogin(false)
    }, [])

    
    return (
        <Container>
            <LoginFormDesktop login={isLogin}/>
            <SignUpFormDesktop login={isLogin}/>
            <OverlayPanel 
                login={isLogin} 
                onToggleLogin={onToggleLoginForm} 
                onToggleSignup={onToggleSignupForm}
            />
        </Container>
    )
}
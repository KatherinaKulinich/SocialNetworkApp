import { LogContainerDesktop } from "@components/login/LogContainerDesktop/LogContainerDesktop"
import { LogContainerMobile } from "@components/login/LogContainerMobile/LogContainerMobile"
import { useState, useCallback } from "react"
import { useWindowSize } from "../hooks/useWindowSize"
import { PageContainer } from "@components/containers/PageContainer/PageContainer"
import { Wrapper } from "@components/layout/components/Wrapper/Wrapper"




export const LoginPage:React.FC = () => {
    
    const {width} = useWindowSize();
    const [isLogin, setIsLogin] = useState(true)

    const onToggleLoginForm = useCallback(() => {
        setIsLogin(true)
    }, [])
    const onToggleSignupForm = useCallback(() => {
        setIsLogin(false)
    }, [])

    const onToogleCard = useCallback(() => {
        if (isLogin) {
            onToggleSignupForm()
            return
        }
        onToggleLoginForm()
    }, [isLogin])


   
    return (
        <Wrapper>
            <PageContainer>
                {width >= 900 ? (
                    <LogContainerDesktop/>
                ) : (
                    <LogContainerMobile 
                        login={isLogin} 
                        onToggleCards={onToogleCard}
                    />
                )}     
            </PageContainer>
        </Wrapper>
    )
}
import { LogContainerDesktop } from "@components/login/LogContainerDesktop/LogContainerDesktop"
import { LogContainerMobile } from "@components/login/LogContainerMobile/LogContainerMobile"
import { useState, useCallback } from "react"
import { useWindowSize } from "../hooks/useWindowSize"
import { PageContainer } from "@components/containers/PageContainer/PageContainer"
import { Wrapper } from "@components/layout/components/Wrapper/Wrapper"
import { useMyFullData } from "hooks/useMyFullData"
import { useAppSelector } from "hooks/hooks"




export const LoginPage:React.FC = () => {
    // const myData = useMyFullData()
    const myData = useAppSelector(state => state.userData.user)
    // console.log(myData);
    
    const { width } = useWindowSize();
    const [isLogin, setIsLogin] = useState(true)

    const onToggleLoginForm = useCallback(() => {
        setIsLogin(true)
    }, [])
    const onToggleSignupForm = useCallback(() => {
        setIsLogin(false)
    }, [])

    const onToggleCard = useCallback(() => {
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
                        onToggleCards={onToggleCard}
                    />
                )}     
            </PageContainer>
        </Wrapper>
    )
}
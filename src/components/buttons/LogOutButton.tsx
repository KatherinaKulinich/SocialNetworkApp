import { message } from "antd";
import { useAuth } from "hooks/authorization/useAuth";
import { useFirebaseAuth } from "hooks/authorization/useFirebaseAuth";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { SecondaryButton } from "./SecondaryButton/SecondaryButton";
import { useAppSelector } from "hooks/hooks";




export const LogOutButton:React.FC = () => {
    const navigate = useNavigate();
    const { onLogOut } = useFirebaseAuth()
    const { isAuth } = useAuth()

    const userData = useAppSelector(state => state.userData.user)
    const userName = userData?.personalData?.userName
    
    
    
    const onProfileLogOut = useCallback(() => {
        if (isAuth && userName) {
            onLogOut()
            
            message.info(`See you next time, ${userName}! Have a good rest of the day!`, 5)
            setTimeout(navigate, 2000, `/login`)
        }
    }, [isAuth, userData, navigate])


    return (
        <SecondaryButton 
            buttonColor='#FFFFFF' 
            buttonText='Log out'
            type='button'
            onClickHandler={onProfileLogOut}
        />
    )
}
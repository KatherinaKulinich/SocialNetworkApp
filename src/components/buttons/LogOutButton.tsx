import { message } from "antd";
import { useAuth } from "hooks/authorization/useAuth";
import { useFirebaseAuth } from "hooks/authorization/useFirebaseAuth";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { SecondaryButton } from "./SecondaryButton/SecondaryButton";
import { useAppSelector } from "hooks/hooks";
import { useMyFullData } from "hooks/useMyFullData";



export const LogOutButton:React.FC = () => {
    const navigate = useNavigate();
    const { onLogOut } = useFirebaseAuth()
    const { isAuth } = useAuth()
    const userData = useMyFullData()
    const userName = userData?.personalData?.userName
    
    
    
    const onProfileLogOut = useCallback(() => {
        if (isAuth && userName) {
            onLogOut()
            message.info(`See you next time, ${userName}! Have a good rest of the day!`, 5)
            navigate('/login')
        }
    }, [isAuth, userData])


    return (
        <SecondaryButton 
            buttonColor='#FFFFFF' 
            buttonText='Log out'
            type='button'
            onClickHandler={onProfileLogOut}
        />
    )
}
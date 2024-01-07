import { message } from "antd";
import { useAuth } from "hooks/authorization/useAuth";
import { useFirebaseAuth } from "hooks/authorization/useFirebaseAuth";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SecondaryButton } from "./SecondaryButton/SecondaryButton";
import { useAppSelector } from "hooks/hooks";

// import { useUserData } from "hooks/useUserData";




export const LogOutButton:React.FC = () => {

    const navigate = useNavigate();
    const { onLogOut } = useFirebaseAuth()
    const { isAuth } = useAuth()
    // const { userData } = useUserData()
    const userData = useAppSelector(state => state.userData.user)
    
    
    

    const onProfileLogout = useCallback(() => {
        if (isAuth && userData.userName !== undefined) {
            onLogOut()
            message.info(`See you next time, ${userData.userName}! Have a good rest of the day!`, 5)
            navigate('/login')
        }
    }, [isAuth, userData])


    return (
        <SecondaryButton 
            buttonColor='#FFFFFF' 
            buttonText='Log out'
            type='button'
            onClickHandler={onProfileLogout}
        />
    )
}
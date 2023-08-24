import { message } from "antd";
import { useAuth } from "hooks/useAuth";
import { useFirebaseAuth } from "hooks/useFirebaseAuth";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SecondaryButton } from "./SecondaryButton/SecondaryButton";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { fetchUserFullData } from "rdx/slices/userDataSlice";




export const LogOutButton:React.FC = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const { onLogOut } = useFirebaseAuth()
    const { userId } = useAuth()
    const { isAuth } = useAuth()
    
    useEffect(() => {
        if (userId !== null && userId !== undefined ) {
            dispatch(fetchUserFullData(userId))
        }
    }, [dispatch, userId])
    
    
    const { userName } = useAppSelector(state => state.userData.user)

    const onProfileLogout = useCallback(() => {
        if (isAuth) {
            onLogOut()
            message.info(`See you next time, ${userName}! Have a good rest of the day!`, 5)
            navigate('/login')
        }
    }, [isAuth])


    return (
        <SecondaryButton 
            buttonColor='#FFFFFF' 
            buttonText='Log out'
            type='button'
            onClickHandler={onProfileLogout}
        />
    )
}
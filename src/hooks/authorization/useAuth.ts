import { useAppSelector } from "../hooks"





export const useAuth = () => {
    const { 
        userEmail, 
        userPassword, 
        userId 
    } = useAppSelector(state => state.userAuth);
    
    return {
        isAuth: !!userId,
        userId,
        userEmail,
        userPassword,
    }
}
import { fetchUserFullData } from "rdx/slices/userDataSlice"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "./hooks"
import { useAuth } from "./useAuth"




export const useUserData = () => {

    const dispatch = useAppDispatch()
    const { userId } = useAuth()

    useEffect(() => {
        if (userId !== null && userId !== undefined ) {
            dispatch(fetchUserFullData(userId))
        }
    }, [])

    const userData = useAppSelector(state => state.userData.user)
    
    
    return userData
}
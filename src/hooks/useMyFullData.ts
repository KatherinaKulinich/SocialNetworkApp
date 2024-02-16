import { fetchUserFullData } from "rdx/slices/userDataSlice"
import { useEffect } from "react"
import { useAuth } from "./authorization/useAuth"
import { useAppDispatch, useAppSelector } from "./hooks"




export const useMyFullData = () => {
    const dispatch = useAppDispatch()
    const { userId } = useAuth()

    useEffect(() => {
       const getMyProfileData = () => {
            if (userId) {
                return dispatch(fetchUserFullData(userId))
            }
        }
        getMyProfileData()
    }, [])
    
    const userData = useAppSelector(state => state.userData.user)

    
    return userData
}
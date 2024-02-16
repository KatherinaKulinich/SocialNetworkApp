import { useAppDispatch, useAppSelector } from "./hooks"
import { useEffect } from "react"
import { useMyFullData } from "./useMyFullData"
import { fetchCurrentRandomUsersData, fetchRandomUsers } from "rdx/slices/randomUsersSlice"



export const useRandomUsersData = () => {
    const dispatch = useAppDispatch()
    const myData = useMyFullData()

    const { userId } = myData?.personalData ?? {}
    const { userCity, userCountry } = myData?.profileData ?? {}


    useEffect(() => {
        if (userId) {
            dispatch(fetchRandomUsers(userCountry, userCity, userId))
        }
    }, [])

    const randomUsers = useAppSelector(state => state.randomUsers.randomUsers)

    
    return randomUsers
}
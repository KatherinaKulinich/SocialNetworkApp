import { useAppDispatch, useAppSelector } from "./hooks"
import { useEffect, useState } from "react"
import { useMyFullData } from "./useMyFullData"
import { fetchCurrentRandomUsersData, fetchRandomUsers } from "rdx/slices/randomUsersSlice"
import { UserProfile } from "types/UserProfile"




export const useRandomUsersData = () => {
    const dispatch = useAppDispatch()
    const myData = useAppSelector(state => state.userData.user)

    const { userId } = myData?.personalData ?? {}
    const { userCity, userCountry } = myData?.profileData ?? {}


    useEffect(() => {
        if (userId) {
            dispatch(fetchRandomUsers(userCountry, userCity, userId))
        }
    }, [userId])

    const [randomUsers, setRandomUsers] = useState<Array<UserProfile> | null>(null)
    const users = useAppSelector(state => state.randomUsers.randomUsers)

    
    useEffect(() => {
        if (users) {
            setRandomUsers(users)
            return
        }
        setRandomUsers([])
    }, [users])
    
    return randomUsers
}
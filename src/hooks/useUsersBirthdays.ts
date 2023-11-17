import { useCallback, useEffect, useState } from "react"
import { UserFullData } from "types/UserFullDataType"




export const useUsersBirthdays = (usersProfileData:UserFullData[]) => {

    const [usersThisMonth, setUsersThisMonth] = useState<UserFullData[]>([])
    const [usersNextMonth, setUsersNextMonth] = useState<UserFullData[]>([])
    const [usersBirthdayToday, setUsersBirthdayToday] = useState<string[]>([])

    const currentMonth = new Date().getMonth()
    const currentDay = new Date().getDate()
    


    const getUsersBirthdays = useCallback((usersArray:UserFullData[]) => {
        setUsersThisMonth([])
        setUsersNextMonth([])

        usersArray.map(user => {
            const { userBirthday } = user;

            if (userBirthday.month === currentMonth && userBirthday.day >= currentDay) {
                setUsersThisMonth(prev => [...prev, user])
            } else if (userBirthday.month === currentMonth + 1) {
                setUsersNextMonth(prev => [...prev, user])
                return
            }
        })
    }, [usersThisMonth, usersNextMonth])


    useEffect(() => {
        getUsersBirthdays(usersProfileData)
    }, [usersProfileData])


    const getTodaysBirthdaysUsers = useCallback((users:UserFullData[]) => {
        setUsersBirthdayToday([])

        users.map(user => {
            const { userBirthday } = user;

            if (userBirthday.day === currentDay) {
                setUsersBirthdayToday(prev => [...prev, user.userFullname])
                return
            }
            return user
        })

    }, [usersBirthdayToday])


    useEffect(() => {
        getTodaysBirthdaysUsers(usersThisMonth)
    }, [usersThisMonth])




    return {
        usersThisMonth,
        usersNextMonth,
        usersBirthdayToday
    }
}
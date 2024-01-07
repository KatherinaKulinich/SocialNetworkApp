import { useCallback, useEffect, useState } from "react"
import { UserProfile } from "types/UserProfile"
import { useAppSelector } from "../hooks";





export const useUsersBirthdays = (usersProfileData:UserProfile[]) => {
    const myData:UserProfile  = useAppSelector(state => state.userData.user);
    const { month, day} = myData.profileData.userBirthday

    const [usersThisMonth, setUsersThisMonth] = useState<UserProfile[]>([])
    const [usersNextMonth, setUsersNextMonth] = useState<UserProfile[]>([])
    const [usersBirthdayToday, setUsersBirthdayToday] = useState<string[]>([])
    const [isMyBirthdayToday, setIsMyBirthdayToday] = useState(false)

    const currentMonth = new Date().getMonth()
    const currentDay = new Date().getDate()
    


    const getUsersBirthdays = useCallback((usersArray:UserProfile[]) => {
        setUsersThisMonth([])
        setUsersNextMonth([])

        usersArray.map(user => {
            const { userBirthday } = user.profileData;

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


    
    const getTodaysBirthdaysUsers = useCallback((users:UserProfile[]) => {
        setUsersBirthdayToday([])

        users.map(user => {
            const { userBirthday } = user.profileData;
            const { userFullname } = user.personalData

            if (userBirthday.day === currentDay) {
                setUsersBirthdayToday(prev => [...prev, userFullname])
                return
            }
            return user
        })
    }, [usersBirthdayToday])



    const getMyBirthday = useCallback(() => {
        const isBirthDay = month === currentMonth && day === currentDay
        
        if (isBirthDay) {
            setIsMyBirthdayToday(true)
        }
    }, [])
    
    
    
    useEffect(() => {
        getTodaysBirthdaysUsers(usersThisMonth)
        getMyBirthday()
    }, [usersThisMonth])


    return {
        usersThisMonth,
        usersNextMonth,
        usersBirthdayToday,
        isMyBirthdayToday
    }
}
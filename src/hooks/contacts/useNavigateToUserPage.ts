import { UserProfile } from "types/UserProfile"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "hooks/hooks"
import { message } from "antd"
import { fetchFriends } from "rdx/slices/friendsSlice"
import { fetchSelectedUserData } from "rdx/slices/usersSlice"
import { useCallback } from "react"


export const useNavigateToUserPage = (user:UserProfile) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const { userId, userFullname } = user.personalData
    const { friends } = user.contacts
    const ids = friends?.map(user => user.id) || []



    const goToUserPage = useCallback(async () => {
        message.loading('', 1)

        await dispatch(fetchSelectedUserData(userId))
        navigate( `/users/${userFullname}/profile`)
    }, [])


    return {
        goToUserPage
    }
}
import { UserFullData } from "types/UserFullDataType"
import { UserCard } from "./components/UserCard"
import { TextIconButton } from "@components/buttons/TextIconButton/TextIconButton"
import { theme } from "@styles/Theme"
import { FaUserTimes, FaUserCheck } from "react-icons/Fa"
import { useFollowUser } from "hooks/contacts/useFollowUser"
import { useAppDispatch } from "hooks/hooks"
import { useCallback } from "react"


interface RequestCardProps {
    user: UserFullData,
}

export const RequestCard:React.FC<RequestCardProps> = ({user}) => {
    const { acceptFriendRequest, deleteFriendRequest } = useFollowUser(user)
    const dispatch = useAppDispatch()

    


    return (
        <UserCard user={user}>
            <>
                <TextIconButton 
                    text='Delete' 
                    icon={<FaUserTimes/>} 
                    color={theme.colors.regularDark} 
                    textSize={"12px"} 
                    iconSize={"13px"} 
                    buttonType={"button"} 
                    fontWeight={600}
                    onClickHandler={(e) => deleteFriendRequest(e)}
                />
                <TextIconButton 
                    text='Accept' 
                    icon={<FaUserCheck/>} 
                    color={theme.colors.success} 
                    textSize={"12px"} 
                    iconSize={"13px"} 
                    buttonType={"button"} 
                    fontWeight={600}
                    onClickHandler={(e) => acceptFriendRequest(e)}
                />
            </>
        </UserCard>
    )
}
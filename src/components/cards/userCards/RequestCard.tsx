import { UserCard } from "./components/UserCard"
import { TextIconButton } from "@components/buttons/TextIconButton/TextIconButton"
import { theme } from "@styles/Theme"
import { FaUserTimes, FaUserCheck } from "react-icons/Fa"
import { UserProfile } from "types/UserProfile"
import { useUserSubscription } from "hooks/contacts/useUserSubscription"


interface RequestCardProps {
    user: UserProfile,
}




export const RequestCard:React.FC<RequestCardProps> = ({user}) => {
    const { acceptFriendRequest, deleteFriendRequest } = useUserSubscription(user)


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
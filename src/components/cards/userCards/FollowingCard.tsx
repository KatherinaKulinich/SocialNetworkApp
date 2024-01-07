import { UserCard } from "./components/UserCard"
import { TextIconButton } from "@components/buttons/TextIconButton/TextIconButton"
import { theme } from '@styles/Theme'
import { FaUserSlash } from "react-icons/Fa"
import { UserProfile } from "types/UserProfile"
import { useUserSubscription } from "hooks/contacts/useUserSubscription"

interface FollowingCardProps {
    user: UserProfile,
}




export const FollowingCard:React.FC<FollowingCardProps> = ({user}) => {
    const { unfollowFromUser } = useUserSubscription(user)

    return (
        <UserCard user={user}  >
            <TextIconButton 
                text='Unfollow' 
                icon={<FaUserSlash/>} 
                color={theme.colors.regularDark} 
                textSize={"12px"} 
                iconSize={"13px"} 
                buttonType={"button"} 
                fontWeight={600}
                onClickHandler={(event) => unfollowFromUser(event)}
            />
        </UserCard>
    )
}
import { UserFullData } from "types/UserFullDataType"
import { UserCard } from "./components/UserCard"
import { TextIconButton } from "@components/buttons/TextIconButton/TextIconButton"
import { theme } from '@styles/Theme'
import { FaUserSlash } from "react-icons/Fa"

interface FollowingCardProps {
    user: UserFullData,
}

export const FollowingCard:React.FC<FollowingCardProps> = ({user}) => {
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
                // onClickHandler={onChatToUser}
            />
        </UserCard>
    )
}
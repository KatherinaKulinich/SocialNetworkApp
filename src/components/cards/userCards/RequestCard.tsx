import { UserFullData } from "types/UserFullDataType"
import { UserCard } from "./components/UserCard"
import { TextIconButton } from "@components/buttons/TextIconButton/TextIconButton"
import { theme } from "@styles/Theme"
import { FaUserTimes, FaUserCheck } from "react-icons/Fa"


interface RequestCardProps {
    user: UserFullData,
}

export const RequestCard:React.FC<RequestCardProps> = ({user}) => {
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
                    // onClickHandler={onChatToUser}
                />
                <TextIconButton 
                    text='Accept' 
                    icon={<FaUserCheck/>} 
                    color={theme.colors.success} 
                    textSize={"12px"} 
                    iconSize={"13px"} 
                    buttonType={"button"} 
                    fontWeight={600}
                    // onClickHandler={onChatToUser}
                />
            </>
        </UserCard>
    )
}
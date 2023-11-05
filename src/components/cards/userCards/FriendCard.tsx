import { UserFullData } from "types/UserFullDataType";
import { useCallback } from "react";
import { UserCard } from "./components/UserCard";
import { TextIconButton } from "@components/buttons/TextIconButton/TextIconButton";
import { theme } from "@styles/Theme";
import { useNavigate } from "react-router-dom";
import { BsFillChatHeartFill } from "react-icons/Bs";

interface FriendCardProps {
    user: UserFullData,
}

export const FriendCard:React.FC<FriendCardProps> = ({user}) => {
    const { userFullname, userGender } = user;
    const navigate = useNavigate()


    const onChatToUser = useCallback(() => {
        navigate(`/myChats/${userFullname}/chat`)
    }, [])



    return (
        <UserCard user={user} >
            <TextIconButton 
                text={`Chat to ${userGender === 'Female' ? 'her' : 'him'}`} 
                icon={<BsFillChatHeartFill/>} 
                color={theme.colors.regularDark} 
                textSize={"12px"} 
                iconSize={"15px"} 
                buttonType={"button"} 
                fontWeight={600}
                onClickHandler={onChatToUser}
            />
        </UserCard>
    )
}
import { UserFullData } from "types/UserFullDataType";
import { useAppDispatch } from "hooks/hooks";
import { getSelectedUserData } from "rdx/slices/usersSlice";
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
    const { userLocation, userAvatar, fullname, userBirthday, userGender } = user;

    const navigate = useNavigate()

    // const dispatch = useAppDispatch()

    // const onSaveUserData = useCallback(() => {
    //     dispatch(getSelectedUserData(user))
    //     console.log(user);
        
    // }, [dispatch])

    const onChatToUser = useCallback(() => {
        navigate(`/myChats/${fullname}/chat`)
    }, [])



    return (
        <UserCard 
            user={user} 
            path="myFriends"
        >
            <TextIconButton 
                text={`Chat to ${userGender === 'Female' ? 'her' : 'him'}`} 
                // text={`Chat to ${user.userName}`} 
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
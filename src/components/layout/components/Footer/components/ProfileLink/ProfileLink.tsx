import { AiOutlineUser } from "react-icons/Ai"
import { FooterText } from "../../Footer.styled"
import { ProfileCard, ProfileCardText, ProfileCardTitle } from "./ProfileLink.styled"
import { Icon } from "@components/icons/Icon"
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { useNavigate } from "react-router-dom";
import { fetchSelectedUserData } from "rdx/slices/usersSlice";
import { fetchFriends } from "rdx/slices/friendsSlice";
import { message } from "antd";
import { UserProfile } from "types/UserProfile";





export const ProfileLink:React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const MY_ID = import.meta.env.VITE_MY_ID;


    const goToMyProfilePage = useCallback(async () => {
        message.loading('', 2)

        await dispatch(fetchSelectedUserData(MY_ID))
        navigate('/users/KatherinaKulinich/profile')

    }, [])


    return (
        <ProfileCard onClick={goToMyProfilePage}>
            <Icon 
                icon={<AiOutlineUser/>} 
                iconColor='#FFFFFF' 
                iconSize='26px'
            />
            <ProfileCardText>
                <ProfileCardTitle>My profile</ProfileCardTitle>
                <FooterText>in this app</FooterText>
            </ProfileCardText>
        </ProfileCard>
    )
}
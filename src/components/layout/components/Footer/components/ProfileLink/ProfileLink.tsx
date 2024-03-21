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





export const ProfileLink:React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const MY_ID = import.meta.env.VITE_MY_ID;


    const user = useAppSelector(state => state.users.selectedUser)
    const userFullname = user?.personalData?.userFullname
    const friends = user?.contacts?.friends
    const ids = friends?.map(user => user.id) || []


    const goToMyProfilePage = useCallback(async () => {
        message.loading('Loading the page...', 6)
        await dispatch(fetchSelectedUserData(MY_ID)) 
        if (ids && userFullname) {
            await dispatch(fetchFriends(ids, 'friends')) 
            setTimeout(navigate, 6000, `/users/${userFullname}/profile`)
        }
    }, [dispatch, navigate])


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
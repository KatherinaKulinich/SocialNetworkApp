import { AiOutlineUser } from "react-icons/Ai"
import { FooterText } from "../../Footer.styled"
import { ProfileCard, ProfileCardText, ProfileCardTitle } from "./ProfileLink.styled"
import { Icon } from "@components/icons/Icon"
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { useNavigate } from "react-router-dom";
import { fetchSelectedUserData } from "rdx/slices/usersSlice";
import { message } from "antd";




export const ProfileLink:React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const MY_ID = import.meta.env.VITE_MY_ID;
    const myData = useAppSelector(state => state.userData.user)
    const myId = myData?.personalData?.userId


    const goToMyProfilePage = useCallback(async () => {
        if (myId && MY_ID) {
            if (myId !== MY_ID) {
                message.loading('', 2)
                await dispatch(fetchSelectedUserData(MY_ID))
                navigate('/users/KatherinaKulinich/profile')
            } else if (myId === MY_ID) {
                navigate('/myProfile')
            }
        }
    }, [myId, MY_ID, dispatch, navigate])


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
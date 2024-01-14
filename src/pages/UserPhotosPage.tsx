import image from '@images/friendPhotos.svg';
import { PageImgTitle } from "@components/PageImgTitle/PageImgTitle"
import { PageContainer } from "@components/containers/PageContainer/PageContainer"
import { PhotosContainer } from "@components/containers/PhotosContainer/PhotosContainer"
import { TextIconButton } from "@components/buttons/TextIconButton/TextIconButton";
import { theme } from "@styles/Theme";
import { MdDoubleArrow } from 'react-icons/Md';
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components"
import { useAppSelector } from "hooks/hooks";
import { UserProfile } from 'types/UserProfile';




export const UserPhotosPage:React.FC = () => {
    const navigate = useNavigate();
    const userData = useAppSelector(state => state.userData.user)

    const user:UserProfile = useAppSelector(state => state.users.selectedUser);
    const { userFullname, userName } = user.personalData;

    
    const goToUserProfilePage = useCallback(() => {
        navigate(`/users/${userFullname}/profile`)
    },[])
    

    return (
        <PageContainer>
            <PageImgTitle 
                image={image} 
                titleFirst={`${userName}'s`}
                titleSecond='photos'
            />
            <ButtonBox>
                <TextIconButton 
                    icon={<MdDoubleArrow style={{ transform: 'rotate(180deg)' }} />} 
                    text={`back to ${userName}'s profile`} 
                    color={theme.colors.regularDark} 
                    textSize={'12px'} 
                    iconSize={"20px"} 
                    buttonType={"button"}
                    fontWeight={600}
                    onClickHandler={goToUserProfilePage}
                />
            </ButtonBox>
            <PhotosContainer
                owner='friend'
                userOwner={user}
                myUserData={userData}
            />
        </PageContainer>
    )
}



const ButtonBox = styled.div`
    align-self: flex-start;
`

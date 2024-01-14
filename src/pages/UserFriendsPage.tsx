import img from '@images/friendFriends.svg';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { PageImgTitle } from "@components/PageImgTitle/PageImgTitle"
import { PageContainer } from "@components/containers/PageContainer/PageContainer"
import { FriendsContainer } from "@components/containers/usersContainers/FriendsContainer";
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { TextIconButton } from '@components/buttons/TextIconButton/TextIconButton';
import { theme } from '@styles/Theme';
import { MdDoubleArrow } from 'react-icons/Md';






export const UserFriendsPage:React.FC = () => {
    const navigate = useNavigate();

    const user = useAppSelector(state => state.users.selectedUser)
    const { userFullname, userName } = user.personalData;


    const goToUserProfilePage = useCallback(() => {
        navigate(`/users/${userFullname}/profile`)
    },[])



    return (
        <PageContainer>
            <PageImgTitle 
                image={img} 
                titleFirst={`${userName}'s`}
                titleSecond='friends'
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
            <FriendsContainer
                role='userFriends' 
                user={user}           
            />
        </PageContainer>
    )
}

const ButtonBox = styled.div`
    align-self: flex-start;
`

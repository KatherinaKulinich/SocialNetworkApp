import img from '@images/friendFriends.svg';
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { PageImgTitle } from "@components/PageImgTitle/PageImgTitle"
import { PageContainer } from "@components/containers/PageContainer/PageContainer"
import { FriendsContainer } from "@components/containers/FriendsContainer/FriendsContainer";
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import { TextIconButton } from '@components/buttons/TextIconButton/TextIconButton';
import { theme } from '@styles/Theme';
import { MdDoubleArrow } from 'react-icons/Md';
import styled from 'styled-components';
import { fetchFriends } from 'rdx/slices/friendsSlice';





export const UserFriendsPage:React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    const user = useAppSelector(state => state.users.selectedUser)
    const { userFullname, userName } = user;

    const onGoToProfile = useCallback(() => {
        navigate(`/users/${userFullname}/profile`)
    },[])

    
    useEffect(() => {
        const getUserProfileData = () => {
            if (user) {
                dispatch(fetchFriends(user.friends, 'friends'))
            }
        }
        getUserProfileData()
    }, [])


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
                    textSize={'16px'} 
                    iconSize={"30px"} 
                    buttonType={"button"}
                    fontWeight={600}
                    onClickHandler={onGoToProfile}
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

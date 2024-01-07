import img from '@images/friendprofile.svg';
import { useEffect, useCallback } from 'react';
import { styled } from "styled-components";
import { PageImgTitle } from "@components/PageImgTitle/PageImgTitle"
import { UserProfileCard } from "@components/cards/UserProfile/UserProfileCard"
import { PageContainer } from "@components/containers/PageContainer/PageContainer"
import { TextIconButton } from "@components/buttons/TextIconButton/TextIconButton";
import { theme } from "@styles/Theme";
import { useNavigate } from "react-router-dom";
import { BsFillChatSquareHeartFill } from 'react-icons/Bs'
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { fetchFriends } from "rdx/slices/friendsSlice";
import { useCheckUserStatus } from 'hooks/contacts/useCheckUserStatus';
import { useAuth } from 'hooks/authorization/useAuth';
import { fetchUserFullData } from 'rdx/slices/userDataSlice';
import { useFriendshipWithUser } from 'hooks/contacts/useFriendshipWithUser';
import { UserProfile } from 'types/UserProfile';







export const UserProfilePage:React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const { userId:id } = useAuth()
    const { buttonText, buttonIcon: ButtonIcon, isButtonDisabled } = useCheckUserStatus()

    const user:UserProfile = useAppSelector(state => state.users.selectedUser);
    const { userFullname, userName, userId } = user.personalData;

    const { friends } = user.contacts
    const friendsIdsArray = friends.map(user => user.id)
    
    
    useEffect(() => {
        if (id) {
            dispatch(fetchUserFullData(id))
        }
    }, [dispatch, id])
    
    
    const goToChatWithUser = useCallback(() => {
        navigate(`/myChats/${userFullname}/chat`)
    },[])
    
    
    useEffect(() => {
        if (user) {
            dispatch(fetchFriends(friendsIdsArray, 'friends'))
        }
    }, [dispatch, user])
    
    const friendsData = useAppSelector(state => state.friends.friendsData)
    const { interactWithUser } = useFriendshipWithUser(user)


    return (
        <PageContainer>
            <PageImgTitle 
                image={img} 
                titleFirst={`${userName}'s`}
                titleSecond="profile"
            />
            <Actions>
                <TextIconButton 
                    icon={ButtonIcon} 
                    text={buttonText} 
                    color={theme.colors.regularDark} 
                    textSize={'12px'} 
                    iconSize={"24px"} 
                    buttonType={"button"}
                    fontWeight={600}
                    onClickHandler={interactWithUser}
                    isDisabled={isButtonDisabled}
                />
                <TextIconButton 
                    icon={<BsFillChatSquareHeartFill />} 
                    text={`Chat to ${userName}`} 
                    color={theme.colors.regularDark} 
                    textSize={'12px'} 
                    iconSize={"24px"} 
                    buttonType={"button"}
                    fontWeight={600}
                    onClickHandler={goToChatWithUser}
                />
            </Actions>
            {Object.keys(user).length !== 0 && (
                <UserProfileCard
                    role='userProfile'
                    user={user}
                    friendsData={friendsData} 
                />
            )}
        </PageContainer>
    )
}

const Actions = styled.div`
    align-self: end;
    display:flex;
    align-items: center;
    gap:30px;
`
import img from '@images/friendprofile.svg';
import { useCallback, useState } from 'react';
import { styled } from "styled-components";
import { PageImgTitle } from "@components/PageImgTitle/PageImgTitle"
import { UserProfileCard } from "@components/cards/UserProfile/UserProfileCard"
import { PageContainer } from "@components/containers/PageContainer/PageContainer"
import { TextIconButton } from "@components/buttons/TextIconButton/TextIconButton";
import { theme } from "@styles/Theme";
import { useNavigate } from "react-router-dom";
import { BsFillChatSquareHeartFill } from 'react-icons/Bs'
import { useAppSelector } from "hooks/hooks";
import { useCheckUserStatus } from 'hooks/contacts/useCheckUserStatus';
import { useFriendshipWithUser } from 'hooks/contacts/useFriendshipWithUser';
import { UserProfile } from 'types/UserProfile';
import { FaRegClock  } from 'react-icons/Fa'
import { RiUserUnfollowFill, RiUserAddFill, RiUserStarFill } from "react-icons/Ri"
import { useChatChecking } from 'hooks/chat/useChatChecking';







export const UserProfilePage:React.FC = () => {
    const navigate = useNavigate();
    const user:UserProfile = useAppSelector(state => state.users.selectedUser);

    
    const { interactWithUser } = useFriendshipWithUser(user)
    const { openChatWithUser } = useChatChecking(user)

    const { buttonText, buttonIcon, isButtonDisabled } = useCheckUserStatus()
    const { userFullname, userName } = user?.personalData ?? {}

  
    const goToChatWithUser = useCallback(async() => {
        if (user) {
            openChatWithUser()
            .then(() => {
                navigate(`/myChats/${userFullname}/chat`)
            })
        }
    },[user])
    
    
    const friendsData = useAppSelector(state => state.friends.friendsData)

    const icon:JSX.Element = buttonIcon === 'request' 
    ? < FaRegClock/> 
    : buttonIcon === 'follower' 
    ? <RiUserStarFill/> 
    : buttonIcon === 'addFriend' 
    ? <RiUserAddFill/> 
    : <RiUserUnfollowFill/>




    return (
        <PageContainer>
            <PageImgTitle 
                image={img} 
                titleFirst={`${userName}'s`}
                titleSecond="profile"
            />
            <Actions>
                <TextIconButton 
                    icon={icon} 
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
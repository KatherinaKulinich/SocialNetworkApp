import img from '@images/friendprofile.svg';
import { styled } from "styled-components";
import { PageImgTitle } from "@components/PageImgTitle/PageImgTitle"
import { UserProfile } from "@components/cards/UserProfile/UserProfile"
import { PageContainer } from "@components/containers/PageContainer/PageContainer"
import { TextIconButton } from "@components/buttons/TextIconButton/TextIconButton";
import { theme } from "@styles/Theme";
import { useNavigate } from "react-router-dom";
import { BsFillChatSquareHeartFill } from 'react-icons/Bs'
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { UserFullData } from "types/UserFullDataType";
import { useFollowUser } from "hooks/useFollowUser";
import { fetchFriends } from "rdx/slices/friendsSlice";
import { useCheckUserStatus } from 'hooks/useCheckUserStatus';
import { useAuth } from 'hooks/useAuth';
import { fetchUserFullData } from 'rdx/slices/userDataSlice';
import React from 'react';







export const UserProfilePage:React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const { interactWithUser } = useFollowUser()
    const { buttonText, buttonIcon, isButtonDisabled } = useCheckUserStatus()

    const user:UserFullData = useAppSelector(state => state.users.selectedUser);
    const { userFullname, userName, userId, friends } = user;

    
    const { userId:id } = useAuth()
    useEffect(() => {
        if (id) {
            dispatch(fetchUserFullData(id))
        }
    }, [dispatch, id])


    const onGoToChat = useCallback(() => {
        navigate(`/myChats/${userFullname}/chat`)
    },[])
    
    
    useEffect(() => {
        if (user) {
            dispatch(fetchFriends(user.friends, 'friends'))
        }
    }, [dispatch, user])
    
    const friendsData = useAppSelector(state => state.friends.friendsData)


    return (
        <PageContainer>
            <PageImgTitle 
                image={img} 
                titleFirst={`${userName}'s`}
                titleSecond="profile"
            />
            <Actions>
                <TextIconButton 
                    icon={buttonIcon} 
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
                    onClickHandler={onGoToChat}
                />
            </Actions>
            {Object.keys(user).length !== 0 && (
                <UserProfile
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
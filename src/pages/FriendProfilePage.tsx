import { styled } from "styled-components";
import { PageImgTitle } from "@components/PageImgTitle/PageImgTitle"
import { UserProfile } from "@components/cards/UserProfile/UserProfile"
import { PageContainer } from "@components/containers/PageContainer/PageContainer"
import { TextIconButton } from "@components/buttons/TextIconButton/TextIconButton";
import img from '@images/friendprofile.svg';
import { theme } from "@styles/Theme";
import { useNavigate } from "react-router-dom";
import { BsFillChatSquareHeartFill } from 'react-icons/Bs'
import { FaUserPlus, FaUserMinus  } from 'react-icons/Fa'
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { UserFullData } from "types/UserFullDataType";
import { useFollowUser } from "hooks/useFollowUser";
import { getSelectedUserData } from "rdx/slices/usersSlice";




export const FriendProfilePage:React.FC = () => {
    const navigate = useNavigate();


    const onGoToChat = useCallback(() => {
        navigate(`/myChats/${user.fullname}/chat`)
    },[])

    const { isFriend, onFriends } = useFollowUser()

    const user:UserFullData = useAppSelector((state:any) => state.users.selectedUser)
   

    return (
        <PageContainer>
            <PageImgTitle 
                image={img} 
                titleFirst={`${user.userName}'s`}
                titleSecond="profile"
            />
            <Actions>
                <TextIconButton 
                    icon={isFriend? <FaUserMinus/> : <FaUserPlus/>} 
                    text={isFriend ? 'Remove from friends' :'Add to friends'} 
                    color={theme.colors.regularDark} 
                    textSize={'12px'} 
                    iconSize={"24px"} 
                    buttonType={"button"}
                    fontWeight={600}
                    onClickHandler={onFriends}
                />
                <TextIconButton 
                    icon={<BsFillChatSquareHeartFill />} 
                    text={`Chat to ${user.userName}`} 
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
                    role="userProfile"
                    name={user.userName}
                    fullname={user.fullname} 
                    age={user.userBirthday.age} 
                    gender={user.userGender} 
                    friendsQuantity={user.friends?.length || 0} 
                    location={user.userLocation} 
                    famStatus={user.userFamStatus} 
                    interests={user.userInterests} 
                    aboutInfo={user.userAbout} 
                    birthday={user.userBirthday.fullDate} 
                    avatar={user.userAvatar} 
                    photos={user.photos || []} 
                    friends={user.friends || []}
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
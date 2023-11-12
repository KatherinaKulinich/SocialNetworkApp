import { memo, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DefaultImage, FriendCard, FriendsBox, Name } from "./FriendsPreview.styled";
import { Avatar } from "@components/Avatar/Avatar";
import { theme } from "@styles/Theme";
import defaultAvatar from '@images/avatar.jpg';
import { UserFullData } from "types/UserFullDataType";
import { useAppSelector } from "hooks/hooks";
import { PiUsersFourFill } from "react-icons/Pi";
import { PreviewContainer, PageLink } from "../../UserProfile.styled";
import { DataItem } from "../DataItem/DataItem";
import { Paragraph } from "@components/text/Paragraph";


interface FriendsPreviewProps {
    link: string;
    user: UserFullData;
    role: 'myProfile' | 'userProfile';
    friendsData: UserFullData[]
}





export const FriendsPreview:React.FC<FriendsPreviewProps> = ({link, user, role, friendsData}) => {
    const { userName, friends } = user;
    const [defaultAvatars, setDefaultAvatars] = useState<JSX.Element[]>([])

    const createDefaultAvatars = useCallback((friendsProfiles:string[]):JSX.Element[] => {
        let defaultAvatarsList = [];
        for (let i = 0; i < 9 - friendsProfiles?.length; i++) {
            defaultAvatarsList.push(
                <DefaultImage key={`1${i}`}>
                    <Avatar 
                        photo={defaultAvatar} 
                        border={theme.colors.white}
                        size="50px"
                        />
                </DefaultImage>
            )
        }
        return defaultAvatarsList
    }, [friends])
    
    
    useEffect(() => {
        setDefaultAvatars(createDefaultAvatars(friends))
    }, [friends])
    
    
    const navigate = useNavigate();
    const onGoToPage = useCallback(() => {
        navigate(`${link}`)
    },[])

    const [friendsAvatarsForPreview, setFriendsAvatarsForPreview] = useState<UserFullData[]>([])


    //??? friends box change every post reaction
    useEffect(() => {
        if (friendsData)  {
            setFriendsAvatarsForPreview(friendsData)
        }
    }, [friendsData])


    return (
        <PreviewContainer>
            <DataItem 
                icon={<PiUsersFourFill/>} 
                itemName={role === 'userProfile' ? `${userName}'s friends` : 'My friends'} 
                direction='column'
            />
            {friends?.length > 0 ? (
                <PageLink to={link}>
                    See more...
                </PageLink>
            ) : (
                <Paragraph 
                    text="no friends yet" 
                    color={theme.colors.regular}
                />
            )}

            <FriendsBox onClick={onGoToPage}>
                {friendsAvatarsForPreview?.length > 0 && (
                    friendsAvatarsForPreview.map((friend, index) => (
                        <FriendCard key={index}>
                            <Avatar 
                                photo={friend.userAvatar} 
                                border={theme.colors.lightGray}
                                size="30px"
                            />
                            <Name>
                                {friend.userFullname}
                            </Name>
                        </FriendCard>     
                    ))
                )}
                {friendsData?.length < 9 && defaultAvatars}   
            </FriendsBox>
        </PreviewContainer>
    )
}
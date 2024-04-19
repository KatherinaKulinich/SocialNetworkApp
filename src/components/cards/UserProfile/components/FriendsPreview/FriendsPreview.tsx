import defaultAvatar from '@images/avatar.jpg';
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DefaultImage, FriendCard, FriendsBox, Name } from "./FriendsPreview.styled";
import { Avatar } from "@components/Avatar/Avatar";
import { theme } from "@styles/Theme";
import { PiUsersFourFill } from "react-icons/Pi";
import { PreviewContainer, PageLink } from "../../UserProfileCard.styled";
import { DataItem } from "../DataItem/DataItem";
import { Paragraph } from "@components/text/Paragraph";
import { UserProfile } from "types/UserProfile";
import { useAppDispatch } from "hooks/hooks";
import { fetchFriends} from "rdx/slices/friendsSlice";


interface FriendsPreviewProps {
    link: string;
    user: UserProfile;
    role: 'myProfile' | 'userProfile';
    friendsData: UserProfile[]
}




export const FriendsPreview:React.FC<FriendsPreviewProps> = ({link, user, role, friendsData}) =>  {
    const dispatch = useAppDispatch();
    const [defaultAvatars, setDefaultAvatars] = useState<JSX.Element[]>([])
    const [friendsForPreview, setFriendsForPreview] = useState<Array<UserProfile>>([])

    const { userName } = user?.personalData ?? {}
    const { friends } = user?.contacts ?? {}
    const friendsIdsArray = friends.map(user => user.id) || []


    const createDefaultAvatars = useCallback((friendsProfiles:string[]):JSX.Element[] => {
        let defaultAvatarsList = [];
        for (let i = 0; i < 9 - friendsProfiles?.length; i++) {
            defaultAvatarsList.push(
                <DefaultImage key={`1${i}`}>
                    <Avatar 
                        photo={defaultAvatar} 
                        border={theme.colors.white}
                        size="45px"
                        />
                </DefaultImage>
            )
        }
        return defaultAvatarsList
    }, [])

    useEffect(() => {
        if (friendsData && friendsData?.length === friendsIdsArray?.length) {
            if (friendsData?.length >= 9) {
                const cards = [...friendsData]
                cards.splice(9)
                
                setFriendsForPreview(cards)
                return
            }
            setFriendsForPreview(friendsData)
        }
    }, [friendsData])

    
    useEffect(() => {
        setDefaultAvatars(createDefaultAvatars(friendsIdsArray))
    }, [friendsData])
    
    
    const navigate = useNavigate();
    const goToFriendsPage = useCallback(() => {
        navigate(`${link}`)
    },[])

    useEffect(() => {
        if (friendsIdsArray.length === friendsData.length) return
        dispatch(fetchFriends(friendsIdsArray, 'friends'))
    }, [dispatch, friends])



    return (
        <PreviewContainer>
            <DataItem 
                icon={<PiUsersFourFill/>} 
                itemName={role === 'userProfile' ? `${userName}'s friends` : 'My friends'} 
                direction='column'
            />
            {friendsData && friends?.length > 0 ? (
                <PageLink to={link}>
                    See more...
                </PageLink>
            ) : (
                <Paragraph 
                    text="no friends yet" 
                    color={theme.colors.regular}
                />
            )}

            <FriendsBox onClick={goToFriendsPage}>
               {friendsData && (
                    <>
                        {friendsData?.length > 0 && friendsForPreview?.length && (
                            friendsForPreview?.map((friend, index) => (
                                <FriendCard key={index}>
                                    <Avatar 
                                        photo={friend.profileData.userAvatar} 
                                        border={theme.colors.lightGray}
                                        size="30px"
                                    />
                                    <Name>
                                        {friend.personalData.userFullname}
                                    </Name>
                                </FriendCard>     
                            ))
                        )}
                        {friendsData?.length < 9 && defaultAvatars}   
                    </>
                )}
            </FriendsBox>
        </PreviewContainer>
    )
}
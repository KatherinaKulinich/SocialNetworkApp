import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { DefaultImage, FriendCard, FriendsBox, Name } from "./FriendsPreview.styled";
import { Avatar } from "@components/Avatar/Avatar";
import { theme } from "@styles/Theme";
import defaultAvatar from '@images/avatar.jpg';
import { UserFullData } from "types/UserFullDataType";


interface FriendsPreviewProps {
    friends: UserFullData[];
    link: string;
}

export const FriendsPreview:React.FC<FriendsPreviewProps> = ({friends, link}) => {
    const navigate = useNavigate();

    const onGoToPage = useCallback(() => {
        navigate(`${link}`)
    },[])

    
    let defaultAvatarsList = [];
    for (let i = 0; i < 9 - friends?.length; i++) {
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


    return (
        <FriendsBox onClick={onGoToPage}>
            {friends?.length > 0 && (
                friends.map((friend, index) => (
                    <FriendCard key={index}>
                        <Avatar 
                            photo={friend.userAvatar} 
                            border={theme.colors.lightGray}
                            size="30px"
                        />
                        <Name>
                            {friend.fullname}
                        </Name>
                    </FriendCard>     
                ))
            )}
            {friends?.length < 9 && defaultAvatarsList }   
        </FriendsBox>
    )
}
import { theme } from "@styles/Theme";
import { Icon } from "@components/icons/Icon";
import { Card, Comments, Content, CardImage, PhotoDescription,  Actions, Action, Text, DateText, Separator, LikeBox } from "./PhotoCard.styled"
import { BsSuitHeart, BsSuitHeartFill } from 'react-icons/Bs'
import { FaRegEdit} from 'react-icons/Fa'
import { RiDeleteBinLine } from 'react-icons/Ri'
import { useCallback, useState } from "react";
import { Photo } from "types/Photo";
import { Popconfirm } from "antd";
import { fetchUserFullData } from "rdx/slices/userDataSlice"
import { getSelectedUserPhoto } from "rdx/slices/userContentSlice";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { useManageMyContent } from "hooks/content/useManageMyContent";
import { ReactionAnimation } from "@components/ReactionAnimation/ReactionAnimation";
import { useMyFullData } from "hooks/useMyFullData";
import { usePhotosLikes } from "hooks/content/usePhotosLikes";
import { UserProfile } from "types/UserProfile";


interface PhotoCardProps {
    photo: Photo;
    owner: 'me' | 'friend';
    onOpenModalForEditing: () => void;
    onOpenModalWithComments: () => void;
    isPhotoLiked: boolean;
    photoOwner: UserProfile;
}




export const PhotoCard:React.FC<PhotoCardProps> = ({photo,  owner, onOpenModalForEditing, onOpenModalWithComments, isPhotoLiked, photoOwner}) => {
    const { photoUrl, photoDescription, photoLikes, photoComments, date } = photo;


    const userData = useMyFullData()
    const { togglePhotoLike } = usePhotosLikes()
    const { photos } = userData.content
    
    const dispatch = useAppDispatch()
    const { deleteMyContent } = useManageMyContent()


    const onOpenModalEditing = useCallback(() => {
        dispatch(getSelectedUserPhoto(photo))
        onOpenModalForEditing()
    }, [dispatch, photo, photos])

    const onOpenModalComments = useCallback(() => {
        dispatch(getSelectedUserPhoto(photo))
        onOpenModalWithComments()
    }, [dispatch, photo, photos])


    const onDeletePhoto = useCallback(() => {
        deleteMyContent(photo)
    }, [photo])

    const dateFormat = new Date(date);
    const photoDate = `${dateFormat.getDate()} ${new Intl.DateTimeFormat("en-US", {month: 'long'}).format(date)} `;
    const photoTime = `${dateFormat.getHours()}:${dateFormat.getMinutes()}`;

    const [isAnimation, setIsAnimation] = useState(false)


    const onLikePhoto = useCallback((photo: Photo) => {
        togglePhotoLike(photo, photoOwner)
        dispatch(fetchUserFullData(userData.personalData.userId))
        if (!isPhotoLiked) {
            setIsAnimation(true)
            setTimeout(() => setIsAnimation(false), 4000)
        }

    }, [isPhotoLiked, photoOwner])


        
    return (
        <Card>
            <CardImage src={photoUrl}/>
            <Actions>
                <Action>
                    <DateText>{photoDate}</DateText>
                </Action>
                <Action>
                    <DateText>{photoTime}</DateText>
                </Action>
            </Actions>
            <Separator/>
            <Content>
                { owner === 'me' && (
                    <Actions>
                        <Action 
                            onClick={onOpenModalEditing}
                        >
                            <Icon 
                                icon={<FaRegEdit/>} 
                                iconColor={theme.colors.mediumGray} 
                                iconSize='15px'
                            />
                            <Text>
                                Edit
                            </Text>
                        </Action>
                        <Popconfirm
                            title="Delete this photo card"
                            description="Are you sure to delete this photo?"
                            onConfirm={onDeletePhoto}
                            okText="Delete"
                            cancelText="Cancel"
                        >
                            <Action>
                                <Icon 
                                    icon={<RiDeleteBinLine/>} 
                                    iconColor={theme.colors.mediumGray} 
                                    iconSize='15px'
                                />
                                <Text>
                                    Delete
                                </Text>
                            </Action>
                        </Popconfirm>
                    </Actions>
                ) }
                
                <PhotoDescription>
                    {photoDescription}
                </PhotoDescription>
                <Actions>

                    <Action onClick={() => onLikePhoto(photo)}>
                        <LikeBox>
                            <Icon 
                                icon={isPhotoLiked ? (<BsSuitHeartFill/>) : (<BsSuitHeart/>)} 
                                iconColor={theme.colors.regular} 
                                iconSize='30px'
                            />
                            {isAnimation && <ReactionAnimation value="❤️"/>}
                        </LikeBox>
                        <Text>
                            {photoLikes.length}
                        </Text>
                    </Action>
                    <Action onClick={onOpenModalComments}>
                        <Comments>
                            Comments
                        </Comments>
                         <Text>
                            {photoComments.length}
                        </Text>
                    </Action>
                </Actions>
            </Content>
        </Card>
    )
}
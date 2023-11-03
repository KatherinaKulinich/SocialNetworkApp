import { theme } from "@styles/Theme";
import { Icon } from "../../icons/Icon";
import { Card, Comments, Content, CardImage, PhotoDescription,  Actions, Action, Text } from "./PhotoCard.styled"
import { BsSuitHeart, BsSuitHeartFill } from 'react-icons/Bs'
import { FaRegEdit} from 'react-icons/Fa'
import { RiDeleteBinLine } from 'react-icons/Ri'
import { useCallback, useEffect, useState } from "react";
import { Photo } from "types/Photo";
import { Popconfirm } from "antd";
import { getSelectedUserPhoto } from "rdx/slices/userContentSlice";
import { useAppDispatch } from "hooks/hooks";
import { useUserData } from "hooks/useUserData";
import { useManageMyContent } from "hooks/useManageMyContent";

interface PhotoCardProps {
    photo: Photo;
    owner: 'me' | 'friend';
    onOpenModalForEditing: () => void;
    onOpenModalWithComments: () => void;
}


export const PhotoCard:React.FC<PhotoCardProps> = ({photo,  owner, onOpenModalForEditing, onOpenModalWithComments}) => {
    const { photoUrl, photoDescription, photoLikes, photoComments } = photo;

    const dispatch = useAppDispatch()
    const { userData } = useUserData()
    const { photos } = userData
    const { deleteMyContent } = useManageMyContent()
    const { checkUserLikeReaction, onToggleLike  } = useMyPhotos()

    const onOpenModalEditing = useCallback(() => {
        dispatch(getSelectedUserPhoto(photo))
        onOpenModalForEditing()
    }, [dispatch, photos])

    const onOpenModalComments = useCallback(() => {
        dispatch(getSelectedUserPhoto(photo))
        onOpenModalWithComments()
    }, [dispatch, photos])


    const onDeletePhoto = useCallback(() => {
        deleteMyContent(photo)
    }, [photos])

    const [isPhotoLiked, setIsPhotoLiked] = useState(false)

    const checkUserLike = useCallback(() => {
        if (checkUserLikeReaction(userData.userId, photo)) {
            setIsPhotoLiked(true)
            return
        }
        setIsPhotoLiked(false)
    }, [userData, isPhotoLiked])

    useEffect(() => {
        checkUserLike()
    }, [userData,isPhotoLiked])
    

        
    return (
        <Card>
            <CardImage src={photoUrl}/>

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
                    <Action onClick={() => onToggleLike(userData.userId, photo)}>
                        <Icon 
                            icon={isPhotoLiked ? (<BsSuitHeartFill/>) : (<BsSuitHeart/>)} 
                            iconColor={theme.colors.regular} 
                            iconSize='30px'
                        />
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
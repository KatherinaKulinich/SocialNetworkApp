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
import { useAppDispatch, useAppSelector } from "hooks/hooks";
// import { useUserData } from "hooks/useUserData";
import { useManageMyContent } from "hooks/content/useManageMyContent";
import { usePhotosLikes } from "hooks/content/usePhotosLikes";
import { UserFullData } from "types/UserFullDataType";
import { useCheckMyContentReaction } from "hooks/content/useCheckMyContentReaction";

interface PhotoCardProps {
    photo: Photo;
    owner: 'me' | 'friend';
    onOpenModalForEditing: () => void;
    onOpenModalWithComments: () => void;
    onToggleLike: (item:Photo) => void;
    isPhotoLiked: boolean;
}




export const PhotoCard:React.FC<PhotoCardProps> = ({photo,  owner, onOpenModalForEditing, onOpenModalWithComments, onToggleLike, isPhotoLiked}) => {
    const { photoUrl, photoDescription, photoLikes, photoComments } = photo;

    const userData = useAppSelector(state => state.userData.user)
    const {photos} = userData
    
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
                    <Action onClick={() => onToggleLike(photo)}>
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
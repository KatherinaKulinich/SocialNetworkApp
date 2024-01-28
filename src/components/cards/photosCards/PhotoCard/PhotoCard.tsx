import { theme } from "@styles/Theme";
import { Icon } from "@components/icons/Icon";
import { Card, Comments, Content, CardImage, PhotoDescription,  Actions, Action, Text, DateText, Separator } from "./PhotoCard.styled"
import { BsSuitHeart, BsSuitHeartFill } from 'react-icons/Bs'
import { FaRegEdit} from 'react-icons/Fa'
import { RiDeleteBinLine } from 'react-icons/Ri'
import { useCallback } from "react";
import { Photo } from "types/Photo";
import { Popconfirm } from "antd";
import { getSelectedUserPhoto } from "rdx/slices/userContentSlice";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { useManageMyContent } from "hooks/content/useManageMyContent";


interface PhotoCardProps {
    photo: Photo;
    owner: 'me' | 'friend';
    onOpenModalForEditing: () => void;
    onOpenModalWithComments: () => void;
    onToggleLike: (item:Photo) => void;
    isPhotoLiked: boolean;
}




export const PhotoCard:React.FC<PhotoCardProps> = ({photo,  owner, onOpenModalForEditing, onOpenModalWithComments, onToggleLike, isPhotoLiked}) => {
    const { photoUrl, photoDescription, photoLikes, photoComments, date } = photo;

    const userData = useAppSelector(state => state.userData.user)
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
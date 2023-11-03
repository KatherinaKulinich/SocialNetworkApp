import { CommentCard } from "@components/cards/CommentCard/CommentCard";
import { ModalDefault } from "../ModalDefault/ModalDefault"
import { CommentsBox, Container, Photo, PhotoContent, Text } from "./ModalComments.styled";
import { MessageInput } from "@components/chat/components/MessageInput/MessageInput";
import { useAppSelector, useAppDispatch } from "hooks/hooks";
import { useCallback, useEffect, useState } from "react";
import { useMyPhotos } from "hooks/usePhotosLikes";
import { useUserData } from "hooks/useUserData";
import { Comment } from "types/Photo";
import { getSelectedUserPhoto } from "rdx/slices/userContentSlice";
import { message } from "antd";



interface ModalCommentsProps {
    isModalOpen: boolean;
    onCloseModal: () => void;
    role: 'photo' | 'post';
}

export const ModalComments:React.FC<ModalCommentsProps> = ({isModalOpen, onCloseModal, role}) => {

    const selectedPhoto = useAppSelector(state => state.content.selectedPhoto);
    const { url, description, comments } = selectedPhoto;
    const { sendNewComment } = useMyPhotos()
    const { userData } = useUserData()
    const dispatch = useAppDispatch()
    const { photos } = userData;



    const [commentValue, setCommentValue] = useState('')

    const onChangeCommentValue:React.ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
        setCommentValue(event.target.value)
    }, [])


    const onSaveNewComment = useCallback( async () => {
        await message.loading('adding comment...', 4)
        sendNewComment(commentValue, selectedPhoto, userData)
        setCommentValue('')
        getCurrentComments()
        await message.success('done')
    }, [commentValue, selectedPhoto, userData, comments, photos])


    const [photoComments, setPhotoComments] = useState<Comment[]>([])
        
    const getCurrentComments = useCallback(() => {
        if (userData.photos) {
            userData.photos.map((photo) => {
                if (photo.photoId === selectedPhoto.photoId) {
                    setPhotoComments(photo.comments)
                    return
                }
                return photo
            })
        }
    }, [userData, selectedPhoto])

    useEffect(() => {
        getCurrentComments()
    }, [userData, selectedPhoto])

    

    

    return (
        <ModalDefault 
            isModalOpen={isModalOpen} 
            onCloseModal={onCloseModal} 
            title="Comments"
        >
            <Container>
                <PhotoContent>
                    {role === 'photo' && (
                        <Photo src={url}/>
                    )}
                    <Text>
                        {description}
                    </Text>
                </PhotoContent>
                <CommentsBox>
                    {photoComments?.length > 0 ? (
                        photoComments?.map((item:Comment) => (
                            <CommentCard 
                                key={`${item.date}${item.userId}`}
                                userAvatar={item.userAvatar} 
                                userName={item.userName}
                                commentText={item.text}
                                commentDate={''}
                                commentTime={''}
                            />
                        ))
                        ) : (
                            <Text>
                                There are no comments for this photo yet
                            </Text>
                    )}
                </CommentsBox>
                <MessageInput 
                    role="comment"
                    inputValue={commentValue}
                    onChangeInputValue={onChangeCommentValue}
                    onSubmitText={onSaveNewComment}
                />
            </Container>
        </ModalDefault>
    )
}
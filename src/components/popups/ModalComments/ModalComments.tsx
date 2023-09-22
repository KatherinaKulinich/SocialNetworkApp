import { CommentCard } from "@components/cards/CommentCard/CommentCard";
import { ModalDefault } from "../ModalDefault/ModalDefault"
import { CommentsBox, Container, Photo, PhotoContent, Text } from "./ModalComments.styled";
import textPhoto from '@images/test/6.jpg';
import { MessageInput } from "@components/chat/components/MessageInput/MessageInput";
import { useAppSelector, useAppDispatch } from "hooks/hooks";
import { useCallback, useEffect, useState } from "react";
import { usePhotos } from "hooks/usePhotos";
import { useUserData } from "hooks/useUserData";
import { Comment } from "types/Photo";
import { getSelectedUserPhoto } from "rdx/slices/userContentSlice";


interface ModalCommentsProps {
    isModalOpen: boolean;
    onCloseModal: () => void;
    role: 'photo' | 'post';
}

export const ModalComments:React.FC<ModalCommentsProps> = ({isModalOpen, onCloseModal, role}) => {

    const selectedPhoto = useAppSelector(state => state.content.selectedPhoto);
    const { url, description, comments } = selectedPhoto;
    const { sendNewComment } = usePhotos()
    const { userData } = useUserData()
    const { photos } = userData
    const dispatch = useAppDispatch()


    const [commentValue, setCommentValue] = useState('')

    const onChangeCommentValue:React.ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
        setCommentValue(event.target.value)
    }, [])


    const onSaveNewComment = useCallback(() => {
        sendNewComment(commentValue, selectedPhoto, userData)
        setCommentValue('')
    }, [commentValue, selectedPhoto, userData, comments])


    const [photoComments, setPhotoComments] = useState<Comment[]>([])
        
    const getCurrentComments = useCallback(() => {
        setPhotoComments(comments)
        console.log(selectedPhoto.comments);
    }, [userData, comments])

    useEffect(() => {
        getCurrentComments()
        // dispatch(getSelectedUserPhoto())
        
    }, [userData, comments])

    

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
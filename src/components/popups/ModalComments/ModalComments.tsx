import { CommentCard } from "@components/cards/CommentCard/CommentCard";
import { ModalDefault } from "../ModalDefault/ModalDefault"
import { CommentsBox, Container, PhotoField, PhotoContent, Text } from "./ModalComments.styled";
import { MessageInput } from "@components/chat/components/MessageInput/MessageInput";
import { useCallback, useEffect, useState } from "react";
import { CommentItem, Photo } from "types/Photo";
import { message } from "antd";
import { useContentComments } from "hooks/useContentComments";
import { Post } from "types/Post";
import { UserFullData } from "types/UserFullDataType";




interface ModalCommentsProps {
    isModalOpen: boolean;
    onCloseModal: () => void;
    selectedContent: Post | Photo;
    contentOwner: UserFullData;
}



export const ModalComments:React.FC<ModalCommentsProps> = ({isModalOpen, onCloseModal, selectedContent, contentOwner}) => {

    const { photos, posts } = contentOwner;
    const { saveContentComment } = useContentComments(contentOwner)
    const [commentValue, setCommentValue] = useState('')


    const onChangeCommentValue:React.ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
        setCommentValue(event.target.value)
    }, [])


    const onSaveNewComment = useCallback( async () => {
        await message.loading('adding comment...')
        saveContentComment(commentValue, selectedContent)
        setCommentValue('')
        getCurrentComments()
        await message.success('done')
    }, [commentValue, selectedContent, photos, posts])


    const [currentComments, setCurrentComments] = useState<CommentItem[]>([])
        
    const getCurrentComments = useCallback(() => {
        if ('photoId' in selectedContent) {
            if (contentOwner.photos) {
                // console.log('%cSELECTED PHOTO', 'color:yellow', selectedContent);
                
                contentOwner.photos.map((photo) => {
                    if (photo.photoId === selectedContent.photoId) {
                        console.log(photo.photoId === selectedContent.photoId);
                        
                        setCurrentComments(photo.photoComments)
                        return
                    }
                    return photo
                })
            }
        } else if ('postId' in selectedContent) {
            if (contentOwner.posts) {
                contentOwner.posts.map((post) => {
                    if (post.postId === selectedContent.postId) {
                        setCurrentComments(post.postComments)
                        return
                    }
                    return post
                })
            }
        }
    }, [photos, selectedContent, posts, contentOwner])

    useEffect(() => {
        getCurrentComments()
    }, [selectedContent, posts, photos, contentOwner])


    return (
        <ModalDefault 
            isModalOpen={isModalOpen} 
            onCloseModal={onCloseModal} 
            title="Comments"
        >
            <Container>
                <PhotoContent>
                    {'photoId' in selectedContent && (
                        <PhotoField src={selectedContent?.photoUrl}/>
                    )}
                    <Text>
                        {'photoId' in selectedContent ? selectedContent.photoDescription : selectedContent.postText }
                    </Text>
                </PhotoContent>
                <CommentsBox>
                    {currentComments?.length > 0 ? (
                        currentComments?.map((item:CommentItem) => (
                            <CommentCard 
                                key={`${item.date}${item.userId}`}
                                userAvatar={item.userAvatar} 
                                userName={item.userName}
                                commentText={item.text}
                                commentDate={`${new Date(item.date).getDate()} ${new Intl.DateTimeFormat("en-US", {month: 'long'}).format(item.date)}`}
                                commentTime={`${new Date(item.date).getHours()}:${new Date(item.date).getMinutes()}`}
                            />
                        ))
                        ) : (
                            <Text>
                                There are no comments here yet
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
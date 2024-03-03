import { CommentCard } from "@components/cards/CommentCard/CommentCard";
import { ModalDefault } from "../ModalDefault/ModalDefault"
import { CommentsBox, Container, PhotoField, PhotoContent, Text } from "./ModalComments.styled";
import { MessageInput } from "@components/chat/components/MessageInput/MessageInput";
import { useCallback, useEffect, useState } from "react";
import { Photo } from "types/Photo";
import { CommentItem } from "types/Comment";
import { message } from "antd";
import { useContentComments } from "hooks/content/useContentComments";
import { Post } from "types/Post";
import { UserProfile } from "types/UserProfile";




interface ModalCommentsProps {
    isModalOpen: boolean;
    onCloseModal: () => void;
    selectedContent: Post | Photo;
    contentOwner: UserProfile;
    refreshUsersData: () => void;
}



export const ModalComments:React.FC<ModalCommentsProps> = (
    {isModalOpen, onCloseModal, selectedContent, contentOwner, refreshUsersData}) => {

    const { photos, posts } = contentOwner.content;
    const { saveContentComment } = useContentComments(contentOwner)

    const [commentValue, setCommentValue] = useState('')
    const [currentComments, setCurrentComments] = useState<CommentItem[]>([])


    const onChangeCommentValue:React.ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
        setCommentValue(event.target.value)
    }, [])


    const saveNewComment = useCallback( async () => {
        await message.loading('adding comment...')
        saveContentComment(commentValue, selectedContent)
        refreshUsersData()
        setCommentValue('')
        getCurrentComments()
        await message.success('done')
    }, [commentValue, selectedContent, photos, posts])


        
    const getCurrentComments = useCallback(() => {
        if ('photoId' in selectedContent) {
            if (photos) {
                photos.map((photo) => {
                    if (photo.photoId === selectedContent.photoId) {
                        setCurrentComments(photo.photoComments)
                        return
                    }
                    return photo
                })
            }
        } else if ('postId' in selectedContent) {
            if (posts) {
                posts.map((post) => {
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



    const getCommentDate = (comment:CommentItem) => {
        return `${new Date(comment.date).getDate()} ${new Intl.DateTimeFormat("en-US", {month: 'long'}).format(comment.date)}`
    }

    const getCommentTime = (comment:CommentItem) => {
        return `${new Date(comment.date).getHours()}:${new Date(comment.date).getMinutes()}`
    }


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
                                commentDate={getCommentDate(item)}
                                commentTime={getCommentTime(item)}
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
                    onSubmitText={saveNewComment}
                />
            </Container>
        </ModalDefault>
    )
}
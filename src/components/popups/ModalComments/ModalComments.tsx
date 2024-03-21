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
import { EmojiPopup } from '@components/popups/Emoji/EmojiPopup'
import { MouseDownEvent } from 'emoji-picker-react/dist/config/config';




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
        setIsEmojiiPickerOpen(false)
    }, [])


    const saveNewComment = useCallback( async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        await message.loading('adding comment...')
        setIsEmojiiPickerOpen(false)
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



    const [isEmojiPickerOpen, setIsEmojiiPickerOpen] = useState<boolean>(false)

    const onToggleEmojiiPicker = useCallback(() => {
        setIsEmojiiPickerOpen(prev => !prev)
    }, [isEmojiPickerOpen])

    const addEmojiToMessage: MouseDownEvent = useCallback((event) => {
        setCommentValue(prev => prev.concat(event.emoji))
    }, [commentValue])



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
                        currentComments?.map((commentItem:CommentItem) => (
                            <CommentCard 
                                key={`${commentItem.date}${commentItem.userId}`}
                                comment={commentItem}
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
                    onToggleEmoji={onToggleEmojiiPicker}               
                    />
                
                <EmojiPopup
                    popupIsOpen={isEmojiPickerOpen}
                    getEmoji={addEmojiToMessage}
                    role="modal"
                />
            </Container>
        </ModalDefault>
    )
}
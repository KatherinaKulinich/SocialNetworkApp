import imageNoPosts from '@images/noposts.svg'
import { DataItem } from "../DataItem/DataItem"
import { PostsContainer, PreviewContainer } from "./PostPreview.styled"
import { Post } from "types/Post"
import { UserPostCard } from "@components/cards/postsCards/UserPostCard/UserPostCard"
import { ImageErrorMessage } from "@components/ImageErrorMessage/ImageErrorMessage"
import { ModalComments } from "@components/popups/ModalComments/ModalComments"
import { ModalEditing } from "@components/popups/ModalEditing/ModalEditing"
import { useAppSelector } from "hooks/hooks"
import { useManageMyContent } from "hooks/content/useManageMyContent"
import { useState, useCallback } from "react"
import { UserProfile } from 'types/UserProfile'



interface PostPreviewProps {
    postOwner: 'myProfile'| 'userProfile';
    ownerData: UserProfile;
}



export const PostPreview:React.FC<PostPreviewProps> = ({ postOwner, ownerData}) => {
    const { posts } = ownerData.content;

    const { editMyContent } = useManageMyContent()
    const selectedPost = useAppSelector(state => state.content.selectedPost)


    const [isModalEditionOpen, setIsModalEditionOpen] = useState(false)
    const [isModalComments, setIsModalComments] = useState(false)

    const onOpenModalEdition = useCallback(() => {
        setIsModalEditionOpen(true)
    }, [isModalEditionOpen])
    const onCloseModalEdition = useCallback(() => {
        setIsModalEditionOpen(false)
    }, [isModalEditionOpen])

    const onOpenModalComments = useCallback(() => {
        setIsModalComments(true)
    }, [isModalComments])
    const onCloseModalComments = useCallback(() => {
        setIsModalComments(false)
    }, [isModalComments])


    return (
        <PreviewContainer>
            <DataItem 
                itemName={"posts"} 
                itemValue={posts.length}
                direction={"row"}
            />
            <PostsContainer>
                {posts?.length > 0 ? (
                    posts.map((postItem:Post) => (
                        <UserPostCard 
                            owner={postOwner}
                            post={postItem}
                            key={postItem.postId} 
                            onOpenModalForEditing={onOpenModalEdition} 
                            onOpenModalWithComments={onOpenModalComments}
                            postOwner={ownerData} 
                        />
                    ))
                ) : (
                    <ImageErrorMessage 
                        image={imageNoPosts} 
                        text={"No posts yet"}
                    />
                )}
            </PostsContainer>
            <ModalEditing 
                isModalOpen={isModalEditionOpen}
                onCloseModal={onCloseModalEdition} 
                onEditContent={editMyContent} 
                selectedObject={selectedPost} 
                currentValue={selectedPost.postText}            
            />
            <ModalComments 
                isModalOpen={isModalComments} 
                onCloseModal={onCloseModalComments}
                selectedContent={selectedPost}
                contentOwner={ownerData}
            />
        </PreviewContainer>
    )
}
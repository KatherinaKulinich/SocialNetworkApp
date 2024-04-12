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
import { UserProfile } from 'types/UserProfile'
import { useModalForComments } from "hooks/popups/useModalForComments";
import { useModalForEditing } from "hooks/popups/useModalForEditing";
import { useEffect, useState } from 'react'




interface PostPreviewProps {
    postOwner: 'myProfile'| 'userProfile';
    ownerData: UserProfile;
    refreshData: () => void;
}



export const PostPreview:React.FC<PostPreviewProps> = ({ postOwner, ownerData, refreshData}) => {
    const { posts } = ownerData.content;
    
    const sortedPosts = [...posts]?.sort((a, b) => {
        return b.date - a.date
    }) 




    const { editMyContent } = useManageMyContent()
    const selectedPost = useAppSelector(state => state.content.selectedPost)

    const { isModalComments, onOpenModalComments, onCloseModalComments } = useModalForComments()
    const { isModalEditionOpen, onOpenModalEdition, onCloseModalEdition} = useModalForEditing()




    return (
        <PreviewContainer>
            <DataItem 
                itemName={"posts"} 
                itemValue={sortedPosts.length}
                direction={"row"}
            />
            <PostsContainer>
                {sortedPosts && sortedPosts?.length > 0 ? (
                    sortedPosts?.map((postItem:Post) => (                      
                        <UserPostCard 
                            owner={postOwner}
                            post={postItem}
                            key={postItem.postId} 
                            onOpenModalForEditing={onOpenModalEdition} 
                            onOpenModalWithComments={onOpenModalComments}
                            postOwner={ownerData} 
                            refreshData={refreshData}
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
                refreshUsersData={refreshData}
            />
        </PreviewContainer>
    )
}
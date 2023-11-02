import { ImageErrorMessage } from "@components/ImageErrorMessage/ImageErrorMessage"
import { PageImgTitle } from "@components/PageImgTitle/PageImgTitle"
import { AddingNewPostCard } from "@components/cards/postsCards/AddingNewPostCard/AddingNewPostCard"
import { UserPostCard } from "@components/cards/postsCards/UserPostCard/UserPostCard"
import { ListContainer } from "@components/containers/ListContainer/ListContainer"
import { PageContainer } from "@components/containers/PageContainer/PageContainer"
import img from '@images/myPosts.svg'
import { useManageMyContent } from "hooks/useManageMyContent"
import { useUserData } from "hooks/useUserData"
import { useCallback, useEffect, useState } from "react"
import { Post } from "types/Post"
import imageNoPosts from '@images/noposts.svg'
import { ModalEditing } from "@components/popups/ModalEditing/ModalEditing"
import { useAppSelector } from "hooks/hooks"



export const MyPostsPage: React.FC = () => {
    const { userData } = useUserData()
    const { posts} = userData;
    const { editMyContent } = useManageMyContent()
    const selectedPost = useAppSelector(state => state.content.selectedPost)

    const [isModalEditionOpen, setIsModalEditionOpen] = useState(false)
    const onOpenModalEdition = useCallback(() => {
        setIsModalEditionOpen(true)
    }, [isModalEditionOpen])
    const onCloseModalEdition = useCallback(() => {
        setIsModalEditionOpen(false)
    }, [isModalEditionOpen])

    
    const [isModalComments, setIsModalComments] = useState(false)
    const onOpenModalComments = useCallback(() => {
        setIsModalComments(true)
    }, [isModalComments])
    const onCloseModalComments = useCallback(() => {
        setIsModalComments(false)
    }, [isModalComments])


    return (
        <PageContainer>
            <PageImgTitle 
                image={img} 
                titleFirst='My'
                titleSecond="posts"
            />
            <ListContainer>
                <AddingNewPostCard/>
                {posts?.length > 0 ? (
                    posts.map((postItem:Post) => (
                        <UserPostCard 
                            owner="me"
                            post={postItem}
                            key={postItem.postId} 
                            onOpenModalForEditing={onOpenModalEdition} 
                            onOpenModalWithComments={onOpenModalComments}                        />
                    ))
                ) : (
                    <ImageErrorMessage 
                        image={imageNoPosts} 
                        text={"You have no posts. Create the first one right now!"}
                    />
                )}
            </ListContainer>
            <ModalEditing 
                isModalOpen={isModalEditionOpen}
                onCloseModal={onCloseModalEdition} 
                onEditContent={editMyContent} 
                selectedObject={selectedPost} 
                currentValue={selectedPost.postText}            
            />
            {/* <ModalComments 
                isModalOpen={isModalComments} 
                onCloseModal={onCloseModalComments}
                role='photo'
            /> */}
        </PageContainer>
    )
}
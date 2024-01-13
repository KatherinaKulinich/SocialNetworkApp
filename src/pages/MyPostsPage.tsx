import img from '@images/myPosts.svg'
import { PageImgTitle } from "@components/PageImgTitle/PageImgTitle"
import { PostPreview } from "@components/cards/UserProfile/components/PostsPreview/PostPreview"
import { AddingNewPostCard } from "@components/cards/postsCards/AddingNewPostCard/AddingNewPostCard"
import { ListContainer } from "@components/containers/ListContainer/ListContainer"
import { PageContainer } from "@components/containers/PageContainer/PageContainer"
import { useAppDispatch, useAppSelector } from 'hooks/hooks'
import { useAuth } from 'hooks/authorization/useAuth'
import { fetchUserFullData } from 'rdx/slices/userDataSlice'
import { useEffect } from 'react'
import { useMyFullData } from 'hooks/useMyFullData'




export const MyPostsPage: React.FC = () => {
    const userData = useMyFullData()
  

    return (
        <PageContainer>
            <PageImgTitle 
                image={img} 
                titleFirst='My'
                titleSecond="posts"
            />
            <ListContainer>
                <AddingNewPostCard/>
                <PostPreview
                    postOwner='myProfile'
                    ownerData={userData}
                />
            </ListContainer>
        </PageContainer>
    )
}
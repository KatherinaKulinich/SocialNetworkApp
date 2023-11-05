import img from '@images/myPosts.svg'
import { PageImgTitle } from "@components/PageImgTitle/PageImgTitle"
import { PostPreview } from "@components/cards/UserProfile/components/PostsPreview/PostPreview"
import { AddingNewPostCard } from "@components/cards/postsCards/AddingNewPostCard/AddingNewPostCard"
import { ListContainer } from "@components/containers/ListContainer/ListContainer"
import { PageContainer } from "@components/containers/PageContainer/PageContainer"
import { useUserData } from "hooks/useUserData"





export const MyPostsPage: React.FC = () => {
    const { userData } = useUserData()

  

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
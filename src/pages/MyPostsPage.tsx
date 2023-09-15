import { PageImgTitle } from "@components/PageImgTitle/PageImgTitle"
import { AddingNewPostCard } from "@components/cards/postsCards/AddingNewPostCard/AddingNewPostCard"
import { UserPostCard } from "@components/cards/postsCards/UserPostCard/UserPostCard"
import { ListContainer } from "@components/containers/ListContainer/ListContainer"
import { PageContainer } from "@components/containers/PageContainer/PageContainer"
import img from '@images/myPosts.svg'




export const MyPostsPage: React.FC = () => {
    return (
        <PageContainer>
            <PageImgTitle 
                image={img} 
                titleFirst='My'
                titleSecond="posts"
            />
            <ListContainer>
                <AddingNewPostCard/>
                <UserPostCard/>
                <UserPostCard/>
                <UserPostCard/>
            </ListContainer>
        </PageContainer>
    )
}
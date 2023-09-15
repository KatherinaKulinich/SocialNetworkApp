import { ListContainer } from "@components/containers/ListContainer/ListContainer";
import { PageContainer } from "@components/containers/PageContainer/PageContainer"
import { PageImgTitle } from "@components/PageImgTitle/PageImgTitle"
import image from '@images/friendPosts.svg';




export const FriendPostsPage:React.FC = () => {
    return (
        <PageContainer>
            <PageImgTitle 
                image={image} 
                titleFirst="friendName"
                titleSecond='photos'
            />
            <ListContainer>
                
            </ListContainer>
        </PageContainer>
    )
}
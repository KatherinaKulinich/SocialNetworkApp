import { PageImgTitle } from "@components/PageImgTitle/PageImgTitle"
import { ListContainer } from "@components/containers/ListContainer/ListContainer"
import { PageContainer } from "@components/containers/PageContainer/PageContainer"
import img from '@images/myFeed.svg'




export const MyFeedPage: React.FC = () => {
    return (
        <PageContainer>
            <PageImgTitle 
                image={img} 
                titleFirst='My'
                titleSecond="feed"
            />
            <ListContainer>

            </ListContainer>
        </PageContainer>
    )
}
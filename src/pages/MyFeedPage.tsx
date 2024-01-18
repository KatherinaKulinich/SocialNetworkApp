import { PageImgTitle } from "@components/PageImgTitle/PageImgTitle"
import { FeedPostCard } from "@components/cards/feedCards/FeedPostCard"
import { ListContainer } from "@components/containers/ListContainer/ListContainer"
import { PageContainer } from "@components/containers/PageContainer/PageContainer"
import { SubTitle } from "@components/text/Subtitle"
import img from '@images/myFeed.svg'
import { useFeedUpdates } from "hooks/feed/useFeedUpdates"
import { FeedPost } from "types/Feed"




export const MyFeedPage: React.FC = () => {
    const {newPosts} = useFeedUpdates(1)
    // console.log(newPosts);
    

    return (
        <PageContainer>
            <PageImgTitle 
                image={img} 
                titleFirst='My'
                titleSecond="feed"
            />
            <SubTitle text="The latest news from your friends and followers:"/>
            <ListContainer>
                {newPosts && (
                    newPosts.map((post:FeedPost) => (
                        <FeedPostCard 
                            feedPostItem={post} 
                            key={post.post.postId}
                        />
                    ))
                )}
            </ListContainer>
        </PageContainer>
    )
}
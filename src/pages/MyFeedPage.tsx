import img from '@images/myFeed.svg'
import { useState, useEffect, useCallback } from "react"
import { PageImgTitle } from "@components/PageImgTitle/PageImgTitle"
import { FeedPostCard } from "@components/cards/feedCards/FeedPostCard"
import { ListContainer } from "@components/containers/ListContainer/ListContainer"
import { PageContainer } from "@components/containers/PageContainer/PageContainer"
import { SubTitle } from "@components/text/Subtitle"
import { useFeedUpdates } from "hooks/feed/useFeedUpdates"
import { FeedFriendship, FeedPhoto, FeedPost } from "types/Feed"
import { FeedPhotoCard } from '@components/cards/feedCards/FeedPhotoCard'
import { FeedFriendshipCard } from '@components/cards/feedCards/FeedFriendshipCard'
import { JSX } from 'react/jsx-runtime'
import { useAppDispatch, useAppSelector } from 'hooks/hooks'
import { useMyFullData } from 'hooks/useMyFullData'
import { fetchFriends } from 'rdx/slices/friendsSlice'
import { RegularButton } from '@components/buttons/RegularButton/RegularButton'


type AllFeedNews = (FeedPost | FeedPhoto | FeedFriendship)[]




export const MyFeedPage: React.FC = () => {
    const myData = useMyFullData()
    const dispatch = useAppDispatch()

    const { friends, followers } = myData?.contacts ?? {}
    const { userId:myId } = myData?.personalData ?? {}
    const friendsIds = friends?.map(friend => friend.id) || []

    useEffect(() => {
        dispatch(fetchFriends(friendsIds, 'friends'))
        dispatch(fetchFriends(followers, 'followers'))
    }, [dispatch, myData])

    const friendsData = useAppSelector(state => state.friends.friendsData)
    const followersData = useAppSelector(state => state.friends.followersData)
    const allUsers = friendsData.concat(followersData)

    const [index, setIndex] = useState<number>(1)


    const onLoadMoreNews = useCallback(() => {
        setIndex(prev => prev+1)
    }, [index])


    
    const {newPosts, newPhotos, newFriendships, allNews} = useFeedUpdates(index, allUsers, myId)
    // console.log('posts', newPosts);
    // console.log('photos', newPhotos);
    // console.log('friends', newFriendships);
    console.log('ALL!!!', allNews);

    const [isVisibleNews, setIsVisibleNews] = useState<any>()
    const [feedCards, setFeedCards] = useState<JSX.Element[]>([])
   

    useEffect(() => {
        setIsVisibleNews(allNews)
    }, [allNews])



    const getFeedCards = useCallback(():JSX.Element[] => {
        let newsList: JSX.Element[] = [];

        if (isVisibleNews) {
            for (let i = 0; i < isVisibleNews.length; i++) {
                if ('post' in isVisibleNews[i]) {
                    newsList.push(
                        <FeedPostCard 
                            feedPostItem={isVisibleNews[i]} 
                            key={isVisibleNews[i].post.postId}
                        />
                    )
                } else if ('photo' in isVisibleNews[i]) {
                    newsList.push(
                        <FeedPhotoCard
                            feedPhotoItem={isVisibleNews[i]} 
                            key={isVisibleNews[i].photo.photoId}
                        />
                    )
                } else if ('friend' in isVisibleNews[i]) {
                    newsList.push(
                        <FeedFriendshipCard
                            feedFriendshipItem={isVisibleNews[i]} 
                            key={isVisibleNews[i].friend.id}
                        />
                    )
                }
            }
        }
        return newsList
    }, [isVisibleNews])


    useEffect(() => {
        setFeedCards(getFeedCards())
    }, [isVisibleNews])
    

    return (
        <PageContainer>
            <PageImgTitle 
                image={img} 
                titleFirst='My'
                titleSecond="feed"
            />
            <SubTitle text="The latest isVisibleNews from your friends and followers:"/>
            <ListContainer>
                {isVisibleNews && feedCards}
            </ListContainer>
            <RegularButton 
                buttonType={'button'} 
                buttonText={'Load more news...'}
                onClickHandler={onLoadMoreNews}
            />
        </PageContainer>
    )
}
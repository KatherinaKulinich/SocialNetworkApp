import { PageImgTitle } from "@components/PageImgTitle/PageImgTitle"
import { PageContainer } from "../PageContainer/PageContainer"
import img from '@images/myFeed.svg'
import imageNoNews from '@images/nofriends.svg'
import { theme } from "@styles/Theme"
import { SubTitle } from "@components/text/Subtitle"
import { LoaderComment } from "@components/loaders/LoaderComment"
import { useCallback, useEffect, useState } from "react"
import { UserProfile } from "types/UserProfile"
import { useFeedUpdates } from "hooks/feed/useFeedUpdates"
import { FeedFriendshipCard } from "@components/cards/feedCards/FeedFriendshipCard"
import { FeedPhotoCard } from "@components/cards/feedCards/FeedPhotoCard"
import { FeedPostCard } from "@components/cards/feedCards/FeedPostCard"
import { ImageErrorMessage } from "@components/ImageErrorMessage/ImageErrorMessage"
import { RegularButton } from "@components/buttons/RegularButton/RegularButton"
import { ListContainer } from "../ListContainer/ListContainer"
import { Filter } from "@components/Filter/Filter"
import { filterOptions } from "utils/data/feedFilterOptions"


interface FeedContainerProps {
    users: UserProfile[],
    role: 'feedPage' | 'interestingPage',
    myId: string,
}


export const FeedContainer:React.FC<FeedContainerProps> = ({users, role, myId}) => {
    const [index, setIndex] = useState<number>(1)
    const [filterValue, setFilterValue] = useState('all')
    const [isVisibleNews, setIsVisibleNews] = useState<any>()
    const [feedCards, setFeedCards] = useState<JSX.Element[]>([])

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isNewsAmount, setIsNewsAmount] = useState<number>(0)
    const [isNoMoreNews, setIsNoMoreNews] = useState<boolean>(false)

    const {newPosts, newPhotos, newFriendships, allNews} = useFeedUpdates(index, users, myId, role)


    useEffect(() => {
        setIsLoading(true)

        if (filterValue === 'all') {
            setIsVisibleNews(allNews)
            return
        }
        if (filterValue === 'posts') {
            setIsVisibleNews(newPosts)
            return
        }
        if (filterValue === 'photos') {
            setIsVisibleNews(newPhotos)
            return
        }
        if (filterValue === 'friendship') {
            setIsVisibleNews(newFriendships)
            return
        }
    }, [allNews, filterValue, index])
    

    const loadMoreNews = useCallback(() => {
        setIndex(prev => prev+1)
    }, [index])

    const getFeedCards = useCallback(():JSX.Element[] => {
        let newsList: JSX.Element[] = [];
        console.log(index, isVisibleNews);
        
        
        if (isVisibleNews && isVisibleNews.length > 0) {
            setIsLoading(false)
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
        
        console.log('IS NEWS AMOUNT ON PAGE--111111', isNewsAmount, newsList.length);
        if (isNewsAmount === newsList.length && isNewsAmount !== 0) {
            console.log('IS NEWS AMOUNT ON PAGE', isNewsAmount);
            setIsNoMoreNews(true)
        } else {
            setIsNewsAmount(newsList.length)
            console.warn(newsList.length);
            console.log('IS NO MORE FRESH NEWS', isNoMoreNews);
        }
        return newsList
        
    }, [isVisibleNews, index, isNewsAmount, isNoMoreNews ])


    useEffect(() => {
        setTimeout(() => {
            if (isVisibleNews?.length === 0 && index < 5) {
                setIndex(prev => prev+1) 
            }
        },1500)
        
    }, [isVisibleNews, index])

    useEffect(() => {
        console.log('start cards');
        setTimeout(()=> {
            setFeedCards(getFeedCards())
        },1000)
    }, [index])


    useEffect(() => {
        if (feedCards.length > 0 || isVisibleNews?.length === 0 && index === 5) {
            setTimeout(() => setIsLoading(false), 2000)
        }
    }, [index, feedCards])


    const onChangeFilterValue = useCallback((value: string) => {
        setFilterValue(value)
        setIndex(1)
    }, [filterValue, index])


    return (
        <PageContainer>
            <PageImgTitle 
                image={img} 
                titleFirst='The interesting'
                titleSecond="news"
            />
            <SubTitle 
                color={theme.colors.mediumGray}
                text={role === 'feedPage' ? 'The latest news from your friends and followers:' : 'These are updates from other users that you may be interested in:'}
            />
            {role === 'feedPage' && (
                <Filter 
                    filterOptions={filterOptions} 
                    handleChange={onChangeFilterValue}
                />
            )}
            {isLoading && (
                <LoaderComment/>
            )}
            {isVisibleNews?.length === 0 && index === 5 && !isLoading && (
                <ImageErrorMessage 
                    image={imageNoNews} 
                    text={'It looks like none of your friends have posted anything in the past 5 days'}
                />
            )}
            <ListContainer>
                {isVisibleNews && feedCards}
            </ListContainer>
            {feedCards.length > 0 && isNoMoreNews ? (
                <SubTitle 
                    color={theme.colors.mediumGray}
                    text='No more fresh news'
                />
            ) : (
                <RegularButton 
                    buttonType={'button'} 
                    buttonText={'Load more news...'}
                    onClickHandler={loadMoreNews}
                />
            )}
        </PageContainer>
    )
}
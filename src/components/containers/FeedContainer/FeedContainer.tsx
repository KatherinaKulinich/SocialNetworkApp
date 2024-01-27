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
import { FeedPost, FeedPhoto, FeedFriendship } from "types/Feed"
import { useAppDispatch } from 'hooks/hooks'
import { useNavigate } from 'react-router-dom'


interface FeedContainerProps {
    users: UserProfile[],
    role: 'feedPage' | 'interestingPage',
    myId: string,
}
// type AllFeedNews = (FeedPost | FeedPhoto | FeedFriendship)[]

export const FeedContainer:React.FC<FeedContainerProps> = ({users, role, myId}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    
    const [index, setIndex] = useState<number>(1)
    const [filterValue, setFilterValue] = useState('all')
    const [feedCards, setFeedCards] = useState<JSX.Element[]>([])

    const [isVisibleNews, setIsVisibleNews] = useState<any | null >(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [isNewsAmount, setIsNewsAmount] = useState<number>(0)
    const [isNoMoreNews, setIsNoMoreNews] = useState<boolean>(false)
    const [isNoUsersData, setIsNoUsersData] = useState<boolean>(false)
    const [isButtonVisible, setIsButtonVisible] = useState<boolean>(true)

    const {newPosts, newPhotos, newFriendships, allNews} = useFeedUpdates(index, users, myId, role)


    useEffect(() => {
        setIsVisibleNews(allNews)
    }, [index, allNews])
    
    useEffect(() => {
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
    }, [allNews, filterValue, index, newPosts, newPhotos, newFriendships, isVisibleNews])

    

    const loadMoreNews = useCallback(() => {
        setIndex(prev => prev+1)
    }, [index])

    const onChangeFilterValue = useCallback((value: string) => {
        setIsLoading(true)
        setFilterValue(value)
        setIndex(1)
        setIsVisibleNews([])
        setIsNewsAmount(0)
        setIsNoMoreNews(false)
        setFeedCards([])
    }, [filterValue, index, isVisibleNews])

    



    const getFeedCards = useCallback(():JSX.Element[] => {
        let newsList: JSX.Element[] = [];
 
        if (isVisibleNews && isVisibleNews.length > 0) {
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
                            key={`${isVisibleNews[i].friend.id}${isVisibleNews[i].date}`}
                        />
                    )
                }
            }
        }
        if (isNewsAmount === newsList.length && isNewsAmount !== 0) {
            setIsNoMoreNews(true)
        } else {
            setIsNoMoreNews(false)
            setIsNewsAmount(newsList.length)
        }
        return newsList
    }, [index, isVisibleNews])



    const getFeedState = useCallback(() => {
        if (index === 1) {
            if (isVisibleNews === null) return
            setTimeout(() => {
                if (isVisibleNews?.length === 0) {
                    setIndex(1) 
                }
            })
        }
        if (users.length === 0) {
            setIsNoUsersData(true)
            setIsButtonVisible(false)
        } else {
            setIsButtonVisible(true)
            setIsNoUsersData(false)
            if (isVisibleNews?.length === 0) {
                if (index < 5) {
                    setIndex(prev => prev+1)
                } else {
                    setIsButtonVisible(false)
                }
            } else {
                setTimeout(() => setFeedCards(getFeedCards()))
            }
        }
    }, [isVisibleNews, index, users, isNoUsersData, allNews])



    useEffect(() => {
        getFeedState()
    }, [isVisibleNews, index, users, isNoUsersData, allNews])

    useEffect(() => {
        if (feedCards.length > 0 || isVisibleNews?.length === 0 && index === 5 || isNoUsersData) {
            setTimeout(() => setIsLoading(false), 2000)
        } else {
            setIsLoading(true)
        }
    }, [index, feedCards, isNoUsersData])


    return (
        <>
            <SubTitle 
                color={theme.colors.mediumGray} 
                text={`User news for the last ${index} ${index === 1 ? 'day' : 'days'}`} 
            />
            {role === 'feedPage' && (
                <Filter 
                    filterOptions={filterOptions} 
                    handleChange={onChangeFilterValue}
                />
            )}
            {isLoading && feedCards.length === 0 && (
                <LoaderComment/>
            )}
            {isVisibleNews?.length === 0 && index === 5 && !isLoading && !isNoUsersData && (
                <ImageErrorMessage 
                    image={imageNoNews} 
                    text={'It looks like none of your friends have posted anything in the past 5 days'}
                />
            )}
            {role === 'feedPage' && isNoUsersData && !isLoading && (
                <ImageErrorMessage 
                    image={imageNoNews} 
                    text={"You don't have any friends or followers yet. When you have them you will see their news here."}
                />
            )}

            <ListContainer>
                {isVisibleNews && feedCards}
            </ListContainer>

            {isButtonVisible && (
                <RegularButton 
                    buttonType={'button'} 
                    buttonText={'Load more news...'}
                    onClickHandler={loadMoreNews}
                />
            )}
            {isNoMoreNews && !isLoading && (
                 <SubTitle 
                    color={theme.colors.mediumGray}
                    text='No more fresh news'
                />
            )}
        </>
    )
}
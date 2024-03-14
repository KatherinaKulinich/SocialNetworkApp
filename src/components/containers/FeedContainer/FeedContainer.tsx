import imageNoNews from '@images/noNews.svg'
import imageNoFriends from '@images/noFollowers.svg'
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
import { useAppDispatch, useAppSelector } from 'hooks/hooks'
import { v4 } from 'uuid'
import { fetchFriends } from 'rdx/slices/friendsSlice'
import { fetchCurrentRandomUsersData } from 'rdx/slices/randomUsersSlice'
import { useMyFullData } from 'hooks/useMyFullData'
import { LoaderRing } from '@components/loaders/LoaderRing'
import { useRandomUsersData } from 'hooks/useRandomUsersData'


interface FeedContainerProps {
    users: Array<UserProfile> | null,
    role: 'feedPage' | 'interestingPage',
}


export const FeedContainer:React.FC<FeedContainerProps> = ({users, role}) => {
    const dispatch = useAppDispatch()
    const myData = useAppSelector(state => state.userData.user)

    const randomIds = useAppSelector(state => state.randomUsers.randomUsersIds)
    const {followingList, friends, followers } = myData?.contacts;
    
    const [index, setIndex] = useState<number>(1)
    const [filterValue, setFilterValue] = useState('all')
    const [feedCards, setFeedCards] = useState<JSX.Element[]>([])

    const [isVisibleNews, setIsVisibleNews] = useState<any | null >(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false)
    const [isNoMoreNews, setIsNoMoreNews] = useState<boolean>(false)
    const [isButtonVisible, setIsButtonVisible] = useState<boolean>(true)

    const usersAmount = role === 'feedPage' ? friends?.length+followingList?.length : 5

    const {
        newPosts, 
        newPhotos, 
        newFriendships, 
        allNews, 
        isIdleIndex, 
        isNoUsersData, 
        isNoFreshLatestNews
    } = useFeedUpdates(index, users, myData, role, usersAmount)


    useEffect(() => {
        if (isIdleIndex && !isNoFreshLatestNews) {
            setIndex(prev => prev+1)
        }  
    }, [isIdleIndex, isNoFreshLatestNews])
    

    useEffect(() => {
        setIsLoading(true)

        if (allNews && allNews?.length > 0) {
            setIsVisibleNews(allNews)   
            setIsLoading(false)
        } 
    }, [allNews])


    useEffect(() => {
        if (index >= 7 && allNews.length > 0) {
            setIsNoMoreNews(true)
        }
    }, [index])


    useEffect(() => {
        setIsLoading(true)
        if (allNews?.length === 0 && isNoFreshLatestNews) {
            setIsLoading(false)
            return
        }
    }, [isNoFreshLatestNews, allNews])


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
    }, [filterValue, allNews])


    const loadMoreNews = useCallback(() => {
        setIsButtonLoading(true)
        setIndex(prev => prev+1) 
    }, [])

    const onChangeFilterValue = useCallback((value: string) => {
        setIsLoading(true)
        setFilterValue(value)
        setIsNoMoreNews(false)
        setFeedCards([])
    }, [filterValue])
    

    const getFeedCards = (news:Array<any>):JSX.Element[] => {
        let newsList: JSX.Element[] = [];
        if (news) {
            for (let i = 0; i < news.length; i++) {
                if ('post' in news[i]) {
                    const id = v4()
                    newsList = [...newsList, 
                        <FeedPostCard 
                            feedPostItem={news[i]} 
                            key={id}
                            refreshData={refreshDataAfterContentReaction}
                        />
                    ]
                } else if ('photo' in news[i]) {
                    const id = v4()
                    newsList = [...newsList, 
                        <FeedPhotoCard
                            feedPhotoItem={news[i]} 
                            key={id}
                            refreshData={refreshDataAfterContentReaction}
                        />
                    ]
                } else if ('friend' in news[i]) {
                    const id = v4()
                    newsList = [...newsList, 
                        <FeedFriendshipCard
                            feedFriendshipItem={news[i]} 
                            key={id}
                        />
                    ]
                }
            }
        }
        return newsList
    }


    useEffect(() => {
        setIsLoading(true)

        if (isVisibleNews?.length > 0) {
            const updatedCards = getFeedCards(isVisibleNews)
            setFeedCards(updatedCards)
            setIsButtonLoading(false)
            setIsLoading(false)
        }

    }, [isVisibleNews])



    //button is visible
    useEffect(() => {
        if (isNoFreshLatestNews || isNoUsersData || isLoading || isNoMoreNews || isButtonLoading) {
            setIsButtonVisible(false)
            return
        }
        setIsButtonVisible(true)

        if (isVisibleNews?.length === 0 && filterValue !== 'all' && !isNoUsersData) {
            setIsButtonVisible(false)
            return
        }
        setIsButtonVisible(true)
    }, [isNoFreshLatestNews, isNoUsersData, isLoading, filterValue, isVisibleNews])



    const friendsIds = friends?.map(friend => friend.id) || []

    const refreshDataAfterContentReaction = useCallback(() => {
        if (role === 'feedPage') {
            setTimeout(() => {
                dispatch(fetchFriends(friendsIds, 'friends'))
                dispatch(fetchFriends(followers, 'followers'))
            }, 2000)
        } else if (role === 'interestingPage') {
            setTimeout(() => {
                dispatch(fetchCurrentRandomUsersData(randomIds))
            }, 2000)
        }
    }, [dispatch, randomIds])



    return (
        <>
            {role === 'feedPage' && (
                <Filter 
                    filterOptions={filterOptions} 
                    handleChange={onChangeFilterValue}
                />
            )}
            {isLoading && feedCards.length === 0 && !isNoUsersData && (
                <LoaderComment/>
            )}
            {isNoFreshLatestNews && !isLoading && (
                <ImageErrorMessage 
                    image={imageNoNews} 
                    text={`${role === 'feedPage' ? 'It looks like none of your friends have posted anything in the past 7 days' : 'It looks like none of users have posted anything in the past 7 days'}`}
                />
            )}
            {role === 'feedPage' && isNoUsersData && (
                <ImageErrorMessage 
                    image={imageNoFriends} 
                    text={"You don't have any friends or followers yet. When you have them you will see their news here."}
                />
            )}

            {isVisibleNews?.length === 0 && filterValue !== 'all' && !isNoUsersData && (
                <SubTitle 
                    color={theme.colors.mediumGray}
                    text='No news in this category'
                />
            )}

            <ListContainer>
                {isVisibleNews && feedCards}
            </ListContainer>

            {isButtonLoading && (
                <LoaderRing size={70}/>
            )}
            {isButtonVisible && (
                <RegularButton 
                    buttonType={'button'} 
                    buttonText={'Load more news...'}
                    onClickHandler={loadMoreNews}
                />
            )}
            {isNoMoreNews &&  (
                 <SubTitle 
                    color={theme.colors.mediumGray}
                    text='No more fresh news'
                />
            )}
        </>
    )
}
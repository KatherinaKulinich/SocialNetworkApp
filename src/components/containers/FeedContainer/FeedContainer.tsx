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
import { FeedPost, FeedPhoto, FeedFriendship } from "types/Feed"
import { useAppDispatch, useAppSelector } from 'hooks/hooks'
import { useNavigate } from 'react-router-dom'
import { v4 } from 'uuid'
import { fetchFriends } from 'rdx/slices/friendsSlice'
import { fetchCurrentRandomUsersData } from 'rdx/slices/randomUsersSlice'
import { useMyFullData } from 'hooks/useMyFullData'

type AllFeedNews = (FeedPost | FeedPhoto | FeedFriendship)[]

interface FeedContainerProps {
    users: Array<UserProfile> | null,
    role: 'feedPage' | 'interestingPage',
    myId: string,
}
// type AllFeedNews = (FeedPost | FeedPhoto | FeedFriendship)[]

type DayNews = {
    index: number,
    news: Array<any>,
}

export const FeedContainer:React.FC<FeedContainerProps> = ({users, role, myId}) => {
    const dispatch = useAppDispatch()
    const randomIds = useAppSelector(state => state.randomUsers.randomUsersIds)
    const myData = useMyFullData()
    

    const [index, setIndex] = useState<number>(1)
    const [filterValue, setFilterValue] = useState('all')
    const [feedCards, setFeedCards] = useState<JSX.Element[]>([])

    const [isVisibleNews, setIsVisibleNews] = useState<any | null >(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [isNewsAmount, setIsNewsAmount] = useState<Array<number>>([])
    const [isNoMoreNews, setIsNoMoreNews] = useState<boolean>(false)
    const [isButtonVisible, setIsButtonVisible] = useState<boolean>(true)

    const [isIdleIndex, setIsIdleIndex] = useState<number>(0)

    const {newPosts, newPhotos, newFriendships, allNews} = useFeedUpdates(index, users, myId, role)
    
    
    useEffect(() => {
        console.log('news', allNews);
        
        setIsVisibleNews(allNews)   
    }, [allNews])

    useEffect(() => {
        console.log('users', users);
        
    }, [users])



    // useEffect(() => {
    //     setIsNewsAmount(prev => [...prev, isVisibleNews?.length])
    // }, [isVisibleNews])

    // useEffect(() => {
    //     console.log('isNewsAmount___', isNewsAmount);

    //     const prevValue = isNewsAmount[isNewsAmount.length-2]

    //     if (prevValue === isVisibleNews?.length && prevValue !== 0) {
    //         if (isIdleIndex <= 3) {
    //             setIndex(prev => prev+1)
    //             setIsIdleIndex(prev => prev+1)
    //             return
    //         } else if (isIdleIndex > 4 || index >= 12) {

    //             setIsNoMoreNews(true)
    //         }
    //         return
    //     }
    //     setIsIdleIndex(0)
    //     setIsNoMoreNews(false)
    // }, [isNewsAmount, isVisibleNews])

    // useEffect(() => {
    //     console.log('INDEX____', index);
    //     console.log('idle__index____', isIdleIndex)
        
    // }, [index, isIdleIndex])



  
    


    //no users
    const [isNoUsersData, setIsNoUsersData] = useState<boolean>(false)
    useEffect(() => {
        checkUsersAmount()
    }, [users, allNews, filterValue])

    const checkUsersAmount = useCallback(() => {
        setIsLoading(true)

        if (users?.length === 0 && allNews?.length === 0) {
            setIsNoUsersData(true)
            setIsLoading(false)
            return
        }
        setIsNoUsersData(false)
    }, [users, allNews])





    //no news last 5 days

    const [isNoFreshNews, setIsNoFreshNews] = useState<boolean>(false)
    const checkNewsAmount = useCallback(() => {
        setIsLoading(true)

        if (allNews === null) {
            if (index <= 9) {
                setIndex(prev => prev+1)
                return
            }
            setIsNoFreshNews(true)
            setIsLoading(false)
            return
        }
        setIsNoFreshNews(false)
    }, [allNews, index])

    useEffect(() => {
        if (users && users?.length > 0 && allNews === null) {
            setTimeout(() => {
                checkNewsAmount()
            }, 2500)
        }
    }, [allNews, index, users])

    useEffect(() => {
        console.log('INDEX____', index);
    }, [index])



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
        setIndex(prev => prev+1)
        console.log(allNews?.length, isVisibleNews?.length);

        
    }, [index, allNews, isVisibleNews])


    const onChangeFilterValue = useCallback((value: string) => {
        setIsLoading(true)
        setFilterValue(value)
        setIsNewsAmount([])
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
        setFeedCards(getFeedCards(isVisibleNews))
        setIsLoading(false)
    }, [isVisibleNews])



    //button is visible
    useEffect(() => {
        if (isNoFreshNews || isNoUsersData || isLoading || isNoMoreNews) {
            setIsButtonVisible(false)
            return
        }
        setIsButtonVisible(true)

        if (isVisibleNews?.length === 0 && filterValue !== 'all' && !isNoUsersData) {
            setIsButtonVisible(false)
            return
        }
        setIsButtonVisible(true)
    }, [isNoFreshNews, isNoUsersData, isLoading, filterValue, isVisibleNews])





    const { friends, followers } = myData?.contacts ?? {}
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
    }, [dispatch, myData, randomIds])





    return (
        <>
            {/* <SubTitle 
                color={theme.colors.mediumGray} 
                text={`User news for the last ${index} ${index === 1 ? 'day' : 'days'}`} 
            /> */}
            {role === 'feedPage' && (
                <Filter 
                    filterOptions={filterOptions} 
                    handleChange={onChangeFilterValue}
                />
            )}
            {isLoading && feedCards.length === 0 && (
                <LoaderComment/>
            )}
            {isNoFreshNews && !isLoading && (
                <ImageErrorMessage 
                    image={imageNoNews} 
                    text={`${role === 'feedPage' ? 'It looks like none of your friends have posted anything in the past 10 days' : 'It looks like none of users have posted anything in the past 10 days'}`}
                />
            )}
            {role === 'feedPage' && isNoUsersData && !isLoading && (
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
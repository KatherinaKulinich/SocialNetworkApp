import imageNoNews from '@images/noNews.svg'
import imageNoFriends from '@images/noFollowers.svg'
import { theme } from "@styles/Theme"
import { SubTitle } from "@components/text/Subtitle"
import { LoaderComment } from "@components/loaders/LoaderComment"
import { useCallback, useEffect, useState } from "react"
import { UserProfile } from "types/UserProfile"
import { useFeedUpdates } from "hooks/feed/useFeedUpdates"
import { ImageErrorMessage } from "@components/ImageErrorMessage/ImageErrorMessage"
import { RegularButton } from "@components/buttons/RegularButton/RegularButton"
import { ListContainer } from "../ListContainer/ListContainer"
import { Filter } from "@components/Filter/Filter"
import { filterOptions } from "utils/data/feedFilterOptions"
import { useAppSelector } from 'hooks/hooks'
import { LoaderRing } from '@components/loaders/LoaderRing'
import { FeedCardsContainer } from './components/FeedCardsContainer'

interface FeedContainerProps {
    users: Array<UserProfile> | null,
    role: 'feedPage' | 'interestingPage',
}


export const FeedContainer:React.FC<FeedContainerProps> = ({users, role}) => {
    const myData = useAppSelector(state => state.userData.user)
    const randomIds = useAppSelector(state => state.randomUsers.randomUsersIds)
    
    const {followingList, friends } = myData?.contacts;
    const usersAmount = role === 'feedPage' ? friends?.length+followingList?.length : randomIds?.length
    

    const [index, setIndex] = useState<number>(1)
    const [filterValue, setFilterValue] = useState('all')

    const [isVisibleNews, setIsVisibleNews] = useState<any | null >(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false)
    const [isButtonVisible, setIsButtonVisible] = useState<boolean>(true)

    const [isNoMoreNews, setIsNoMoreNews] = useState<boolean>(false)
    const [isNoNewsInSelectedCategory, setIsNoNewsInSelectedCategory] = useState<boolean>(false)


    const {
        newPosts, 
        newPhotos, 
        newFriendships, 
        allNews, 
        isIdleIndex, 
        isNoUsersData, 
        isNoFreshLatestNews
    } = useFeedUpdates(index, users, myData, role, usersAmount)

    const loadMoreNews = useCallback(() => {
        setIsButtonLoading(true)
        setIndex(prev => prev+1) 
    }, [])

    const onChangeFilterValue = useCallback((value: string) => {
        setIsLoading(true)
        setFilterValue(value)
        setIsNoMoreNews(false)
    }, [filterValue])


    useEffect(() => {
        if (isIdleIndex && !isNoFreshLatestNews) {
            setIndex(prev => prev+1)
            return
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
            return
        }
        setIsNoMoreNews(false)
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
    

    useEffect(() => {
        setIsLoading(true)

        if (isVisibleNews?.length > 0) {
            setIsButtonLoading(false)
            setIsLoading(false)
        }
    }, [isVisibleNews])

    useEffect(() => {
        if (isNoMoreNews) {
            setIsButtonLoading(false)
        }
    }, [isNoMoreNews])


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
    }, [isNoFreshLatestNews, isNoUsersData, isLoading, filterValue, isVisibleNews, isNoMoreNews])


    useEffect(() => {
        if (isVisibleNews?.length === 0 && filterValue !== 'all' && !isNoUsersData) {
            setIsNoNewsInSelectedCategory(true)
            return
        } 
        return setIsNoNewsInSelectedCategory(false)
    }, [isVisibleNews, filterValue, isNoUsersData])


    useEffect(() => {
        if (isNoNewsInSelectedCategory) {
            setIsLoading(false)
        }
    }, [isNoNewsInSelectedCategory, isLoading])



    return (
        <>
            {role === 'feedPage' && (
                <Filter 
                    filterOptions={filterOptions} 
                    handleChange={onChangeFilterValue}
                />
            )}
            {isLoading && isVisibleNews?.length === 0 && !isNoUsersData && (
                <LoaderComment/>
            )}
            {isNoFreshLatestNews && !isLoading && (
                <ImageErrorMessage 
                    image={imageNoNews} 
                    text={`${role === 'feedPage' 
                        ? 'It looks like none of your friends have posted anything in the past 7 days' 
                        : 'It looks like none of users have posted anything in the past 7 days'}`
                    }
                />
            )}
            {role === 'feedPage' && isNoUsersData && (
                <ImageErrorMessage 
                    image={imageNoFriends} 
                    text={"You don't have any friends or followers yet. When you have them you will see their news here."}
                />
            )}
            {isNoNewsInSelectedCategory && (
                <SubTitle 
                    color={theme.colors.mediumGray}
                    text='No news in this category'
                />
            )}
            <ListContainer>
                {isVisibleNews && !isNoNewsInSelectedCategory && (
                    <FeedCardsContainer 
                        role={role} 
                        isVisibleNews={isVisibleNews}
                    />
                )}
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
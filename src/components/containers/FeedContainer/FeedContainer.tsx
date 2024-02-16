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
import { useAppDispatch } from 'hooks/hooks'
import { useNavigate } from 'react-router-dom'
import { v4 } from 'uuid'

type AllFeedNews = (FeedPost | FeedPhoto | FeedFriendship)[]

interface FeedContainerProps {
    users: UserProfile[],
    role: 'feedPage' | 'interestingPage',
    myId: string,
}
// type AllFeedNews = (FeedPost | FeedPhoto | FeedFriendship)[]

export const FeedContainer:React.FC<FeedContainerProps> = ({users, role, myId}) => {
    
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
    }, [allNews])



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
    }, [index])


    const onChangeFilterValue = useCallback((value: string) => {
        setIsLoading(true)
        setFilterValue(value)
        setIsNewsAmount(0)
        setIsNoMoreNews(false)
        setFeedCards([])
    }, [filterValue])
    


    

    


    // useEffect(() => {
    //     // if (isVisibleNews?.length === allNews.length) {
    //     //     setIndex(prev => prev+1)
    //     // }
    //     console.log(all);
        
    //     setIsVisibleNews(all)
    //     setFeedCards(getFeedCards())
    // }, [all])
    

   

    // useEffect(() => {
    //     console.log('isVisib', isVisibleNews);
    //     console.log('all', all);
        
    //     if (isVisibleNews) {
    //         setFeedCards(getFeedCards())
    //     }
    // }, [isVisibleNews])




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
                        />
                    ]
                } else if ('photo' in news[i]) {
                    const id = v4()
                    newsList = [...newsList, 
                        <FeedPhotoCard
                            feedPhotoItem={news[i]} 
                            key={id}
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
        setFeedCards(getFeedCards(isVisibleNews))
    }, [isVisibleNews])



    // const checkNewsAmount = useCallback(() => {
    //     console.log(isNewsAmount, allNews.length);
    //     if (isNewsAmount === allNews.length && isNewsAmount !== 0) {
    //         setIsNoMoreNews(true)
    //     } else {
    //         setIsNoMoreNews(false)
    //         setIsNewsAmount(allNews.length)
    //     }
    // }, [isNewsAmount, allNews])

    // function timeout(delay: number) {
    //     return new Promise( res => setTimeout(res, delay) );
    // }

    



    // const getFeedState = async () => {
    //     // await timeout(1000)

    //     // if (index === 1 && isVisibleNews?.length === 0) {
    //     //     await setIndex(2)
    //     // }




    //     // if (index === 1 && isVisibleNews === null) return
    //     // setTimeout(() => {
    //     //     if (index === 1 && isVisibleNews?.length === 0) {
    //     //         setIndex(1)
    //     //     }
    //     // })
    //     if (index === 1) {
    //         if (isVisibleNews === null) return
    //         setTimeout(() => {
    //             if (isVisibleNews?.length === 0) {
    //                 setIndex(1) 
    //             }
    //         })
    
    //     }
    //     if (users.length === 0) {
    //         setIsNoUsersData(true)
    //         setIsButtonVisible(false)
    //     } else {
    //         console.log('1');
            
    //         setIsButtonVisible(true)
    //         setIsNoUsersData(false)
    //         if (isVisibleNews?.length === 0) {
    //             if (index < 5) {
    //                 setIndex(prev => prev+1)
    //             } else {
    //                 setIsButtonVisible(false)
    //             }
    //         } else {
    //             console.log('2');
    //             setFeedCards(getFeedCards())
    //             // checkNewsAmount()
    //             // setTimeout(() => setFeedCards(getFeedCards()))
    //             // setTimeout(() => checkNewsAmount(), 300)
    //         }
    //     }
    // }



    // useEffect(() => {
    //     getFeedState()
    // }, [])

    // useEffect(() => {
    //     if (feedCards.length > 0 || isVisibleNews?.length === 0 && index === 5 || isNoUsersData) {
    //         setTimeout(() => setIsLoading(false), 2000)
    //     } else {
    //         setIsLoading(true)
    //     }
    // }, [])


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
                    text={`${role === 'feedPage' ? 'It looks like none of your friends have posted anything in the past 5 days' : 'It looks like none of users have posted anything in the past 5 days'}`}
                />
            )}
            {role === 'feedPage' && isNoUsersData && !isLoading && (
                <ImageErrorMessage 
                    image={imageNoFriends} 
                    text={"You don't have any friends or followers yet. When you have them you will see their news here."}
                />
            )}

            {isVisibleNews?.length === 0 && filterValue !== 'all' && (
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
            {isNoMoreNews && !isLoading && (
                 <SubTitle 
                    color={theme.colors.mediumGray}
                    text='No more fresh news'
                />
            )}

           
        </>
    )
}
import img from '@images/myFeed.svg'
import imageNoNews from '@images/nofriends.svg'
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
import { Filter } from '@components/Filter/Filter'
import { filterOptions } from 'utils/data/feedFilterOptions'
import { theme } from '@styles/Theme'
import { ImageErrorMessage } from '@components/ImageErrorMessage/ImageErrorMessage'
import { LoaderComment } from '@components/loaders/LoaderComment'
import { fetchRandomUsers } from 'rdx/slices/usersSlice'
import { FeedContainer } from '@components/containers/FeedContainer/FeedContainer'



type AllFeedNews = (FeedPost | FeedPhoto | FeedFriendship)[]




export const MyFeedPage: React.FC = () => {
    const myData = useMyFullData()
    const dispatch = useAppDispatch()

    const { friends, followers } = myData?.contacts ?? {}
    const { userId } = myData?.personalData ?? {}
    const friendsIds = friends?.map(friend => friend.id) || []



    useEffect(() => {
        dispatch(fetchFriends(friendsIds, 'friends'))
        dispatch(fetchFriends(followers, 'followers'))
    }, [dispatch, myData])

    const friendsData = useAppSelector(state => state.friends.friendsData)
    const followersData = useAppSelector(state => state.friends.followersData)
    const allUsers = friendsData.concat(followersData)

    // const [index, setIndex] = useState<number>(1)
    // const [filterValue, setFilterValue] = useState('all')


    // const loadMoreNews = useCallback(() => {
    //     setIndex(prev => prev+1)
    // }, [index])

   
    
    // const {newPosts, newPhotos, newFriendships, allNews} = useFeedUpdates(index, allUsers, myId, role)
    // console.log(allNews);
    

    // const [isVisibleNews, setIsVisibleNews] = useState<any>()
    // const [feedCards, setFeedCards] = useState<JSX.Element[]>([])

    // const [isLoading, setIsLoading] = useState<boolean>(false)
    // const [isNewsAmount, setIsNewsAmount] = useState<number>(0)
    // const [isNoMoreNews, setIsNoMoreNews] = useState<boolean>(false)
   

    // useEffect(() => {
    //     setIsLoading(true)
    //     // console.log(filterValue);
        
    //     if (filterValue === 'all') {
    //         setIsVisibleNews(allNews)
    //         return
    //     }
    //     if (filterValue === 'posts') {
    //         setIsVisibleNews(newPosts)
    //         return
    //     }
    //     if (filterValue === 'photos') {
    //         setIsVisibleNews(newPhotos)
    //         return
    //     }
    //     if (filterValue === 'friendship') {
    //         setIsVisibleNews(newFriendships)
    //         return
    //     }
    // }, [allNews, filterValue, index])



    // const getFeedCards = useCallback(():JSX.Element[] => {
    //     let newsList: JSX.Element[] = [];
    //     console.log(index, isVisibleNews);
        
        
    //     if (isVisibleNews && isVisibleNews.length > 0) {
    //         setIsLoading(false)
    //         for (let i = 0; i < isVisibleNews.length; i++) {
    //             if ('post' in isVisibleNews[i]) {
    //                 newsList.push(
    //                     <FeedPostCard 
    //                         feedPostItem={isVisibleNews[i]} 
    //                         key={isVisibleNews[i].post.postId}
    //                     />
    //                 )
    //             } else if ('photo' in isVisibleNews[i]) {
    //                 newsList.push(
    //                     <FeedPhotoCard
    //                         feedPhotoItem={isVisibleNews[i]} 
    //                         key={isVisibleNews[i].photo.photoId}
    //                     />
    //                 )
    //             } else if ('friend' in isVisibleNews[i]) {
    //                 newsList.push(
    //                     <FeedFriendshipCard
    //                         feedFriendshipItem={isVisibleNews[i]} 
    //                         key={isVisibleNews[i].friend.id}
    //                     />
    //                 )
    //             }
    //         }
    //     }
        
    //     console.log('IS NEWS AMOUNT ON PAGE--111111', isNewsAmount, newsList.length);
    //     if (isNewsAmount === newsList.length && isNewsAmount !== 0) {
    //         console.log('IS NEWS AMOUNT ON PAGE', isNewsAmount);
    //         setIsNoMoreNews(true)
    //     } else {
    //         setIsNewsAmount(newsList.length)
    //         console.warn(newsList.length);
    //         console.log('IS NO MORE FRESH NEWS', isNoMoreNews);
    //     }
    //     return newsList
        
    // }, [isVisibleNews, index, isNewsAmount, isNoMoreNews ])


    // useEffect(() => {
    //     setTimeout(() => {
    //         if (isVisibleNews?.length === 0 && index < 5) {
    //             setIndex(prev => prev+1) 
    //         }
    //     },1500)
        
    // }, [isVisibleNews, index])

    // useEffect(() => {
    //     console.log('start cards');
    //     setTimeout(()=> {
    //         setFeedCards(getFeedCards())
    //     },1000)
    // }, [index])


    // useEffect(() => {
    //     if (feedCards.length > 0 || isVisibleNews?.length === 0 && index === 5) {
    //         setTimeout(() => setIsLoading(false), 2000)
    //     }
    // }, [index, feedCards])


    // const onChangeFilterValue = useCallback((value: string) => {
    //     setFilterValue(value)
    //     setIndex(1)
    // }, [filterValue, index])



    

    return (
        <FeedContainer 
            users={allUsers} 
            role={"feedPage"} 
            myId={userId}            
        />
    )
}
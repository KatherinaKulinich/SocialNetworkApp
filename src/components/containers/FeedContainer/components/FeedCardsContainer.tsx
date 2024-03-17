import { FeedFriendshipCard } from "@components/cards/feedCards/FeedFriendshipCard";
import { FeedPhotoCard } from "@components/cards/feedCards/FeedPhotoCard";
import { FeedPostCard } from "@components/cards/feedCards/FeedPostCard";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { fetchFriends } from "rdx/slices/friendsSlice";
import { fetchCurrentRandomUsersData } from "rdx/slices/randomUsersSlice";
import { useCallback, useEffect, useState } from "react"
import { v4 } from "uuid";

interface FeedCardsContainerProps {
    isVisibleNews: Array<any>;
    role: 'feedPage' | 'interestingPage';
}



export const FeedCardsContainer:React.FC<FeedCardsContainerProps> = ({role, isVisibleNews}) => {
    const dispatch = useAppDispatch()
    const randomIds = useAppSelector(state => state.randomUsers.randomUsersIds)

    const myData = useAppSelector(state => state.userData.user)
    const { friends, followers } = myData?.contacts;
    const friendsIds = friends?.map(friend => friend.id) || []
    
    const [feedCards, setFeedCards] = useState<JSX.Element[]>([])



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
        if (isVisibleNews?.length > 0) {
            const updatedCards = getFeedCards(isVisibleNews)
            setFeedCards(updatedCards)
        }
    }, [isVisibleNews])


    
    return feedCards
}
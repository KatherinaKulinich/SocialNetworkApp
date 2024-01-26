import { FeedContainer } from "@components/containers/FeedContainer/FeedContainer"
import { useFeedUpdates } from "hooks/feed/useFeedUpdates"
import { useAppDispatch, useAppSelector } from "hooks/hooks"
import { useMyFullData } from "hooks/useMyFullData"
import { fetchRandomUsers } from "rdx/slices/usersSlice"
import { useEffect } from "react"



export const InterestingPage:React.FC = () => {
    const myData = useMyFullData()
    const dispatch = useAppDispatch()

    const { userId } = myData?.personalData ?? {}
    console.log(userId);
    
    const { userCity, userCountry } = myData?.profileData ?? {}

    useEffect(() => {
        dispatch(fetchRandomUsers(userCountry, userCity, userId))
    }, [dispatch, userCountry, userCity])

    const randomUsers = useAppSelector(state => state.users.randomUsers)


    return (
        <FeedContainer 
            users={randomUsers} 
            role={"interestingPage"} 
            myId={userId}            
        />
    )
}
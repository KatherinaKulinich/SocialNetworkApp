import pageImg from '@images/interestingpage.svg'
import { PageImgTitle } from "@components/PageImgTitle/PageImgTitle"
import { FeedContainer } from "@components/containers/FeedContainer/FeedContainer"
import { PageContainer } from "@components/containers/PageContainer/PageContainer"
import { SubTitle } from "@components/text/Subtitle"
import { useAppDispatch, useAppSelector } from "hooks/hooks"
import { useMyFullData } from "hooks/useMyFullData"
import { fetchRandomUsers } from "rdx/slices/usersSlice"
import { useEffect } from "react"





export const InterestingPage:React.FC = () => {
    const myData = useMyFullData()
    const dispatch = useAppDispatch()

    const { userId } = myData?.personalData ?? {}
    const { userCity, userCountry } = myData?.profileData ?? {}

    useEffect(() => {
        dispatch(fetchRandomUsers(userCountry, userCity, userId))
    }, [dispatch, userCountry, userCity])

    const randomUsers = useAppSelector(state => state.users.randomUsers)


    return (
        <PageContainer>
            <PageImgTitle 
                image={pageImg} 
                titleFirst='The '
                titleSecond="interesting"
            />
            <SubTitle text={'These are updates from other users that you may be interested in:'} />
            <FeedContainer 
                users={randomUsers} 
                role={"interestingPage"} 
                myId={userId}            
            />
        </PageContainer>
    )
}
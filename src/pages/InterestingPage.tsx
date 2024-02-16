import pageImg from '@images/interestingpage.svg'
import { PageImgTitle } from "@components/PageImgTitle/PageImgTitle"
import { FeedContainer } from "@components/containers/FeedContainer/FeedContainer"
import { PageContainer } from "@components/containers/PageContainer/PageContainer"
import { SubTitle } from "@components/text/Subtitle"
import { useMyFullData } from "hooks/useMyFullData"
import { useRandomUsersData } from 'hooks/useRandomUsersData'
import { useEffect, useState } from 'react'
import { UserProfile } from 'types/UserProfile'
import { useAppSelector } from 'hooks/hooks'





export const InterestingPage:React.FC = () => {
    const myData = useMyFullData()
    const { userId } = myData?.personalData ?? {}

    const randomUsers = useRandomUsersData()
    const randomIds = useAppSelector(state => state.randomUsers.randomUsersIds)
    const currentRandomUsersData = useAppSelector(state => state.randomUsers.currentRandomUsers)

    const [users, setUsers] = useState<Array<UserProfile>>(randomUsers)


    useEffect(() => {
        if (currentRandomUsersData?.length > 0 && currentRandomUsersData.length === randomIds.length) {
            setUsers(currentRandomUsersData)
           
        }
    }, [currentRandomUsersData])


    return (
        <PageContainer>
            <PageImgTitle 
                image={pageImg} 
                titleFirst='The '
                titleSecond="interesting"
            />
            <SubTitle text={'These are updates from other users that you may be interested in:'} />
            <FeedContainer 
                users={users} 
                role={"interestingPage"} 
                myId={userId}            
            />
        </PageContainer>
    )
}
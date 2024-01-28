import pageImg from '@images/interestingpage.svg'
import { PageImgTitle } from "@components/PageImgTitle/PageImgTitle"
import { FeedContainer } from "@components/containers/FeedContainer/FeedContainer"
import { PageContainer } from "@components/containers/PageContainer/PageContainer"
import { SubTitle } from "@components/text/Subtitle"
import { useMyFullData } from "hooks/useMyFullData"
import { useRandomUsersData } from 'hooks/useRandomUsersData'





export const InterestingPage:React.FC = () => {
    const myData = useMyFullData()
    const { userId } = myData?.personalData ?? {}

    const randomUsers = useRandomUsersData()

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
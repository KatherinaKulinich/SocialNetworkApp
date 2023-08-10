import { PageContainer } from "@components/containers/PageContainer/PageContainer";
import img from '@images/bitrhPage.svg';
import { PageImgTitle } from "@components/PageImgTitle/PageImgTitle";
import { BirthdaysContainer } from "@components/containers/BirthdaysContainer/BirthdaysContainer";



export const BirthDaysAlertsPage:React.FC = () => {
    return (
        <PageContainer>
            <PageImgTitle 
                image={img} 
                titleFirst="friends'"
                titleSecond='birthdays'
            />
            <BirthdaysContainer/>
        </PageContainer>
    )
}
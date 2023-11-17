import { PageContainer } from "@components/containers/PageContainer/PageContainer";
import img from '@images/bitrhPage.svg';
import { PageImgTitle } from "@components/PageImgTitle/PageImgTitle";
import { BirthdaysContainer } from "@components/containers/BirthdaysContainer/BirthdaysContainer";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { fetchFriends } from "rdx/slices/friendsSlice";
import { useEffect } from "react";



export const BirthDaysAlertsPage:React.FC = () => {
    const userData = useAppSelector(state => state.userData.user)
    const dispatch = useAppDispatch()
    
    
    useEffect(() => {
        if (userData) {
            dispatch(fetchFriends(userData))
        }
    }, [dispatch, userData])
    
    const friendsData = useAppSelector(state => state.friends.friendsData)

    return (
        <PageContainer>
            <PageImgTitle 
                image={img} 
                titleFirst="friends'"
                titleSecond='birthdays'
            />
            <BirthdaysContainer friendsData={friendsData}/>
        </PageContainer>
    )
}
import img from '@images/bitrhPage.svg';
import { PageContainer } from "@components/containers/PageContainer/PageContainer";
import { PageImgTitle } from "@components/PageImgTitle/PageImgTitle";
import { BirthdaysContainer } from "@components/containers/BirthdaysContainer/BirthdaysContainer";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { fetchFriends } from "rdx/slices/friendsSlice";
import { useEffect } from "react";



export const BirthDaysAlertsPage:React.FC = () => {
    const dispatch = useAppDispatch()

    const userData = useAppSelector(state => state.userData.user)
    const { friends } = userData.contacts
    const friendsIdsArray = friends.map(user => user.id)
    
    
    useEffect(() => {
        if (userData) {
            dispatch(fetchFriends(friendsIdsArray, 'friends'))
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
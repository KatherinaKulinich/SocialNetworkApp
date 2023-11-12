import img from '@images/friends2.svg'
import { PageImgTitle } from '@components/PageImgTitle/PageImgTitle'
import { PageContainer } from '@components/containers/PageContainer/PageContainer';
import { FriendsContainer } from '@components/containers/FriendsContainer/FriendsContainer';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { useAuth } from 'hooks/useAuth';
import { fetchFriends } from 'rdx/slices/friendsSlice';
import { fetchUserFullData } from 'rdx/slices/userDataSlice';
import { useEffect } from 'react';






export const MyFriendsPage:React.FC = () => {
    const dispatch = useAppDispatch()
    const userData = useAppSelector(state => state.userData.user)
    const { userId } = useAuth()

    
    useEffect(() => {
        const getMyProfileData = () => {
            if (userId && userData) {
                dispatch(fetchUserFullData(userId))
                dispatch(fetchFriends(userData))
            }
        }
        getMyProfileData()
    }, [])


    return (
        <PageContainer>
            <PageImgTitle 
                image={img} 
                titleFirst='My'
                titleSecond='friends'
            />
            <FriendsContainer
                role='myFriends' 
                user={userData}           
            />
        </PageContainer>
    )
}
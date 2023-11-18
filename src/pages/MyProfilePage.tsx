import TitleImg from '@images/profileTitle3.svg'
import { PageImgTitle } from "@components/PageImgTitle/PageImgTitle"
import { UserProfile } from "@components/cards/UserProfile/UserProfile"
import { PageContainer } from "@components/containers/PageContainer/PageContainer"
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { fetchFriends } from 'rdx/slices/friendsSlice';
import { useEffect } from 'react';
import { fetchUserFullData } from 'rdx/slices/userDataSlice'
import { useAuth } from 'hooks/useAuth'





export const MyProfilePage:React.FC = () => {
    const dispatch = useAppDispatch()
    const userData = useAppSelector(state => state.userData.user)
    const { userId } = useAuth()
    
    
    useEffect(() => {
        if (userId) {
            dispatch(fetchUserFullData(userId))
        }
    }, [dispatch, userId])


    useEffect(() => {
        if (userData) {
            dispatch(fetchFriends(userData.friends, 'friends'))
        }
    }, [dispatch, userData])
    
    const friendsData = useAppSelector(state => state.friends.friendsData)
    
    return (
        <PageContainer>
            <PageImgTitle 
                image={TitleImg} 
                titleFirst="My"
                titleSecond="profile"
            />
            {Object.keys(userData).length > 6 && (
                <UserProfile
                    role='myProfile'
                    user={userData} 
                    friendsData={friendsData}
                />
            )}
        </PageContainer>
    )
}
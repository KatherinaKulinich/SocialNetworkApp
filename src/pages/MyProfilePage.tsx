import TitleImg from '@images/profileTitle3.svg'
import { PageImgTitle } from "@components/PageImgTitle/PageImgTitle"
import { UserProfile } from "@components/cards/UserProfile/UserProfile"
import { PageContainer } from "@components/containers/PageContainer/PageContainer"
import { useUserData } from 'hooks/useUserData'
import { useAppDispatch } from 'hooks/hooks';
import { fetchFriends } from 'rdx/slices/friendsSlice';
import { useEffect } from 'react';




export const MyProfilePage:React.FC = () => {
    const dispatch = useAppDispatch()
    const { userData } = useUserData() 
    
    useEffect(() => {
        dispatch(fetchFriends(userData))
    }, [dispatch, userData])

    
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
                />
            )}
        </PageContainer>
    )
}
import TitleImg from '@images/profileTitle3.svg'
import { PageImgTitle } from "@components/PageImgTitle/PageImgTitle"
import { UserProfile } from "@components/cards/UserProfile/UserProfile"
import { PageContainer } from "@components/containers/PageContainer/PageContainer"
import { useAppDispatch, useAppSelector } from 'hooks/hooks'
import { useAuth } from 'hooks/useAuth'
import { fetchUserFullData } from 'rdx/slices/userDataSlice'
import { useEffect } from 'react'
import { getRandomAvatar } from "utils/profileOptions";




export const MyProfilePage:React.FC = () => {
    const dispatch = useAppDispatch()
    const { userId } = useAuth()

    useEffect(() => {
        if (userId !== null && userId !== undefined ) {
            dispatch(fetchUserFullData(userId))
        }
    }, [dispatch, userId])
    
    const userData = useAppSelector(state => state.userData.user) 

    
    return (
        <PageContainer>
            <PageImgTitle 
                image={TitleImg} 
                titleFirst="My"
                titleSecond="profile"
            />
            {Object.keys(userData).length > 6 && (
                <UserProfile 
                    fullname={userData.fullname} 
                    age={userData.userBirthday.age} 
                    gender={userData.userGender} 
                    friendsQuantity={userData.friends.length} 
                    location={userData.userLocation} 
                    famStatus={userData.userFamStatus || 'no data'} 
                    interests={userData.userInterests || 'no data'} 
                    aboutInfo={userData.userAbout || 'no data'} 
                    birthday={userData.userBirthday.fullDate} 
                    avatar={userData.userAvatar || getRandomAvatar()}
                    photos={userData.photos}
                />
            )}
        </PageContainer>
    )
}
import TitleImg from '@images/profileTitle3.svg'
import { PageImgTitle } from "@components/PageImgTitle/PageImgTitle"
import { UserProfile } from "@components/cards/UserProfile/UserProfile"
import { PageContainer } from "@components/containers/PageContainer/PageContainer"
import { getRandomAvatar } from "utils/profileOptions";
import { useUserData } from 'hooks/useUserData'
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { fetchFriends } from 'rdx/slices/friendsSlice';
import { useEffect } from 'react';




export const MyProfilePage:React.FC = () => {
    const dispatch = useAppDispatch()
    const { userData } = useUserData() 
    
    useEffect(() => {
        dispatch(fetchFriends(userData))
    }, [dispatch, userData])

    const friendsData = useAppSelector(state => state.friends.friendsData)
    // console.log(friendsData);
    

    
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
                    name={userData.userName}
                    fullname={userData.fullname} 
                    age={userData.userBirthday.age} 
                    gender={userData.userGender} 
                    friendsQuantity={userData.friends?.length || 0} 
                    location={userData.userLocation} 
                    famStatus={userData.userFamStatus || 'no data'} 
                    interests={userData.userInterests || 'no data'} 
                    aboutInfo={userData.userAbout || 'no data'} 
                    birthday={userData.userBirthday.fullDate} 
                    avatar={userData.userAvatar || getRandomAvatar()}
                    photos={userData.photos || []}
                    friends={friendsData || []}
                />
            )}
        </PageContainer>
    )
}
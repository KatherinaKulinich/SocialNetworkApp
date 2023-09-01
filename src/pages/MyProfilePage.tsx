import TitleImg from '@images/profileTitle3.svg'
import { PageImgTitle } from "@components/PageImgTitle/PageImgTitle"
import { UserProfile } from "@components/cards/UserProfile/UserProfile"
import { PageContainer } from "@components/containers/PageContainer/PageContainer"
import { getRandomAvatar } from "utils/profileOptions";
import { useUserData } from 'hooks/useUserData'




export const MyProfilePage:React.FC = () => {
    const userData = useUserData() 

    
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
                    friends={userData.friends || []}
                />
            )}
        </PageContainer>
    )
}
import { Container, MainInfo, Name, Personal, Subtitle, Field, RegularText, FullInfo,  PersonalMainInfo, InfoContainer, Box, PreviewContainer, PageLink, HobbyItem, HobbiesList } from "./UserProfile.styled"
import { FaUsers,  FaHeart, FaBasketballBall, FaBirthdayCake} from 'react-icons/Fa'
import { ImLocation } from 'react-icons/Im'
import { BsFillInfoCircleFill } from 'react-icons/Bs'
import { ProfileAvatar } from "./components/ProfileAvatar/ProfileAvatar";
import { DataItem } from "./components/DataItem/DataItem";
import { PhotoPreview } from "./components/PhotosPreview/PhotoPreview";
import { FriendsPreview } from "./components/FriendsPreview/FriendsPreview";
import { PostPreview } from "./components/PostsPreview/PostPreview";
import { UserFullData } from "types/UserFullDataType";
import { useAppSelector } from "hooks/hooks";
import { getRandomAvatar } from "utils/getRandomAvatar";


interface UserProfileProps {
    role: 'myProfile' | 'userProfile';
    user:UserFullData;
    friendsData: UserFullData[]
}


export const UserProfile:React.FC<UserProfileProps> = ({user, role, friendsData}) => {
    const { userName, userFullname, userBirthday, userGender, userFamStatus, userAbout, userAvatar, userInterests, userLocation, friends } = user;

    const userAge = userBirthday.age;
    const userBirthDate = userBirthday.fullDate

    const linkToFriendsPage = role === 'myProfile' ? '/myFriends' : `/users/${userFullname}/friends`
    const linkToPhotosPage = role === 'myProfile' ? '/myPhotos' : `/users/${userFullname}/photos`
        


    return (
        <Container>
            <MainInfo>
                <ProfileAvatar userAvatarImg={userAvatar ? userAvatar : getRandomAvatar()}/>
                <PersonalMainInfo>
                    <Name>
                        {userFullname}
                    </Name>
                    <Field>
                        <Subtitle> age: </Subtitle>
                        <RegularText> {userAge} y.o. </RegularText>
                    </Field>
                    <Field>
                        <Subtitle> gender: </Subtitle>
                        <RegularText> {userGender} </RegularText>
                    </Field>
                </PersonalMainInfo>
            </MainInfo>
            <InfoContainer>
                <Box>
                    <DataItem 
                        icon={<FaUsers/>} 
                        itemName={'Friends'} 
                        itemValue={`${friends?.length}`}
                        direction='row'
                    />
                    <DataItem 
                        icon={<ImLocation/>} 
                        itemName={role === 'userProfile' ? 'Lives in' : 'Live in'} 
                        itemValue={userLocation}
                        direction='row'
                    />
                    <DataItem 
                        icon={<FaHeart/>} 
                        itemName={'Family status'} 
                        itemValue={userFamStatus || 'no data'}
                        direction='row'
                    />
                    <DataItem 
                        icon={<FaBirthdayCake/>} 
                        itemName={'Birthday'} 
                        itemValue={userBirthDate}
                        direction='row'
                    />
                </Box>
                <Box>
                    <DataItem 
                        icon={<FaBasketballBall/>} 
                        itemName={'Interests/hobbies'} 
                        direction='column'
                        itemValue={
                            userInterests ? (
                                <HobbiesList>
                                    {userInterests?.map((item, index) => (
                                        <HobbyItem key={index}>
                                            {item}
                                        </HobbyItem>
                                    ))}
                                </HobbiesList>
                            ) : (
                                'no data'
                            ) 
                        }
                    />
                </Box>
            </InfoContainer>
            <Box>
                <DataItem 
                    icon={<BsFillInfoCircleFill/>} 
                    itemName={role === 'userProfile' ? `About ${userName}` : 'About me'} 
                    itemValue={userAbout || 'no data'}
                    direction='column'
                />
            </Box>
            <InfoContainer>
                <PhotoPreview
                    link={linkToPhotosPage}
                    role={role}
                    user={user}
                />
                <FriendsPreview
                    link={linkToFriendsPage}
                    role={role}
                    user={user}
                    friendsData={friendsData}
                />
            </InfoContainer>
            <PostPreview
                postOwner={role}
                ownerData={user}
            />
        </Container>
    )
}
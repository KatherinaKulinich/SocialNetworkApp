import { Container, MainInfo, Name, Subtitle, Field, RegularText,  PersonalMainInfo, InfoContainer, Box, PreviewContainer, PageLink, HobbyItem, HobbiesList } from "./UserProfileCard.styled"
import { FaUsers,  FaHeart, FaBasketballBall, FaBirthdayCake} from 'react-icons/Fa'
import { ImLocation } from 'react-icons/Im'
import { BsFillInfoCircleFill } from 'react-icons/Bs'
import { ProfileAvatar } from "./components/ProfileAvatar/ProfileAvatar";
import { DataItem } from "./components/DataItem/DataItem";
import { PhotoPreview } from "./components/PhotosPreview/PhotoPreview";
import { FriendsPreview } from "./components/FriendsPreview/FriendsPreview";
import { PostPreview } from "./components/PostsPreview/PostPreview";
import { getRandomAvatar } from "utils/getRandomAvatar";
import { UserProfile } from "types/UserProfile";
import { getUserAge } from "utils/getUserAge";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector  } from "hooks/hooks";
import { fetchUserFullData } from "rdx/slices/userDataSlice";
import { fetchSelectedUserData } from "rdx/slices/usersSlice";




interface UserProfileProps {
    role: 'myProfile' | 'userProfile';
    user: UserProfile;
    friendsData: UserProfile[]
}



export const UserProfileCard:React.FC<UserProfileProps> = ({user, role, friendsData}) => {
    const dispatch = useAppDispatch()
    const myData = useAppSelector(state => state.userData.user)
    const { userId:myId } = myData?.personalData ?? {}


    const { userName, userFullname, userId } = user?.personalData ?? {}
    const { userBirthday, userGender, userFamStatus, userAbout, userAvatar, userInterests, userLocation } = user?.profileData ?? {}
    const { friends } = user?.contacts ?? {}


    const { year, month, day, fullDate } = userBirthday ?? {}
    const userAge = getUserAge(year, month, day);

    const linkToFriendsPage = role === 'myProfile' ? '/myFriendsAndFollowers' : `/users/${userFullname}/friends`
    const linkToPhotosPage = role === 'myProfile' ? '/myPhotos' : `/users/${userFullname}/photos`

    const refreshDataAfterPostReaction = useCallback(() => {
        if (role === 'myProfile') {
            setTimeout(() => {
                dispatch(fetchUserFullData(myId))
            }, 2000)
        } else if (role === 'userProfile') {
            setTimeout(() => {
                dispatch(fetchSelectedUserData(userId))
            }, 2000)
        }
    }, [myId, userId])



    return (
        <Container>
            <MainInfo>
                <ProfileAvatar userAvatarImg={userAvatar || getRandomAvatar()}/>
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
                        itemValue={fullDate}
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
                refreshData={refreshDataAfterPostReaction}
            />
        </Container>
    )
}
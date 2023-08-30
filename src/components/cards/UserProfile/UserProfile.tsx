import { Container, MainInfo, Name, Personal, Subtitle, Field, RegularText, FullInfo,  PersonalMainInfo, InfoContainer, Box, PreviewContainer, PageLink, HobbyItem, HobbiesList } from "./UserProfile.styled"
import { FaUsers,  FaHeart, FaBasketballBall, FaBirthdayCake} from 'react-icons/Fa'
import { ImLocation } from 'react-icons/Im'
import { BsFillInfoCircleFill } from 'react-icons/Bs'
import { ProfileAvatar } from "./components/ProfileAvatar/ProfileAvatar";
import { DataItem } from "./components/DataItem/DataItem";
import { PhotoPreview } from "./components/PhotosPreview/PhotoPreview";
import { useCallback } from "react";
import { Photo } from "types/Photo";
import emptyPhoto from '@images/defaultPhoto.jpg';
import { FriendsPreview } from "./components/FriendsPreview/FriendsPreview";
import { PiUsersFourFill } from "react-icons/Pi";
import { IoMdImages } from "react-icons/Io";


interface UserProfileProps {
    fullname: string;
    age: number;
    gender: string;
    friendsQuantity: number;
    location: string;
    famStatus: string;
    interests: string[];
    aboutInfo: string;
    birthday: string;
    avatar: string;
    photos: Photo[];
    friends: string[]
}


export const UserProfile:React.FC<UserProfileProps> = (
    {fullname, age, birthday, gender, location, famStatus, interests, aboutInfo, avatar, friendsQuantity, photos, friends}) => {

        


    const getUserPhotos = useCallback((photos: Photo[]):string[] => {
        const previewPhotos = photos.map(photo => photo.url);

        if (previewPhotos.length < 9 || previewPhotos.length === 0) {
            const difference = 9 - photos.length;

            for (let i = 0; i < difference; i++) {
                previewPhotos.push(emptyPhoto)
            }
            return previewPhotos;
        }
        previewPhotos.splice(9)
        return previewPhotos 
    },[])
    


    return (
        <Container>
            <MainInfo>
                <ProfileAvatar userAvatarImg={avatar}/>
                <PersonalMainInfo>
                    <Name>
                        {fullname}
                    </Name>
                    <Field>
                        <Subtitle> age: </Subtitle>
                        <RegularText> {age} y.o. </RegularText>
                    </Field>
                    <Field>
                        <Subtitle> gender: </Subtitle>
                        <RegularText> {gender} </RegularText>
                    </Field>
                </PersonalMainInfo>
            </MainInfo>
            <InfoContainer>
                <Box>
                    <DataItem 
                        icon={<FaUsers/>} 
                        itemName={'Friends'} 
                        itemValue={`${friendsQuantity}`}
                        direction='row'
                    />
                    <DataItem 
                        icon={<ImLocation/>} 
                        itemName={'Lives in'} 
                        itemValue={location}
                        direction='row'
                    />
                    <DataItem 
                        icon={<FaHeart/>} 
                        itemName={'Family status'} 
                        itemValue={famStatus}
                        direction='row'
                    />
                    <DataItem 
                        icon={<FaBirthdayCake/>} 
                        itemName={'Birthday'} 
                        itemValue={birthday}
                        direction='row'
                    />
                </Box>
                <Box>
                    <DataItem 
                        icon={<FaBasketballBall/>} 
                        itemName={'Interests/hobbies'} 
                        direction='column'
                        itemValue={
                            <HobbiesList>
                                {interests?.map((item, index) => (
                                    <HobbyItem key={index}>
                                        {item}
                                    </HobbyItem>
                                ))}
                            </HobbiesList>
                        }
                    />
                </Box>
            </InfoContainer>
            <Box>
                <DataItem 
                    icon={<BsFillInfoCircleFill/>} 
                    itemName={'About me'} 
                    itemValue={aboutInfo}
                    direction='column'
                />
            </Box>
            <InfoContainer>
                <PreviewContainer>
                    <DataItem 
                        icon={<IoMdImages/>} 
                        itemName={'My photos'} 
                        direction='column'
                    />
                    {photos?.length > 0 ? (
                        <PageLink to={"/myPhotos"}>
                            See more...
                        </PageLink>
                    ) : (
                        <RegularText>
                            no photos yet
                        </RegularText>
                    )}
                    <PhotoPreview 
                        photos={getUserPhotos(photos)} 
                        link="/myPhotos"
                    />
                </PreviewContainer>

                <PreviewContainer>
                    <DataItem 
                        icon={<PiUsersFourFill/>} 
                        itemName={'My friends'} 
                        direction='column'
                    />
                    {friends?.length > 0 ? (
                        <PageLink to={"/myFriends"}>
                            See more...
                        </PageLink>
                    ) : (
                        <RegularText>
                            no friends yet
                        </RegularText>
                    )}
                    <FriendsPreview 
                        friends={[]} 
                        link="/myFriends"
                    />
                </PreviewContainer>
            </InfoContainer>
        </Container>
    )
}
import { BirthdayData } from "./BirthdayData";
import { Chat } from "./Chat";
import { Photo } from "./Photo";
import { Post } from "./Post";




export interface UserProfile {
    personalData: PersonalData,
    profileData: ProfileData,
    content: Content,
    contacts: Contacts,
    additionalData: AdditionalData,
    chats: Array<Chat>,
}





interface PersonalData {
    userId: string,
    userName: string,
    userSurname: string,
    userFullname: string,
}

interface ProfileData {
    userAvatar: string,
    userGender: string,
    userBirthday: BirthdayData,
    userFamStatus: string,
    userCity: string,
    userCountry: string,
    userLocation: string,
    userInterests: Array<string>,
    userAbout: string,
}

interface Content {
    photos: Array<Photo>,
    posts: Array<Post>,
}

interface Contacts {
    friends: Array<Friend>,
    friendRequests: Array<string>,
    followingList: Array<string>,
    followers: Array<string>,
}

interface AdditionalData {
    registerDate: number,
    chatBackground: string,
}

export interface Friend {
    id: string,
    date: number,
}
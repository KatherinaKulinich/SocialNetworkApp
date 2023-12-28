import { Chat } from "./Chat";
import { Photo } from "./Photo";
import { Post } from "./Post";



export interface UserFullData {
    userId: string;
    userName: string;
    userSurname: string;
    userFullname: string;
    registerDate: number;
    userAvatar: string;
    userGender: string;
    userBirthday: Birthday;
    userFamStatus: string;
    userCity: string;
    userCountry: string;
    userLocation: string;
    userInterests: string[];
    userAbout: string;
    chatBackground: string;
    friends: string[];
    photos: Photo[],
    chats: Chat[],
    posts: Post[],
    friendRequests: string[],
    followingList: string[],
    followers:string[],
}


export interface Birthday {
    fullDate: string;
    age: number;
    year: number;
    month: number;
    day: number;
}
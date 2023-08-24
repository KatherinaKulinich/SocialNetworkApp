import { Chat } from "./Chat";
import { Photo } from "./Photo";



export interface UserFullData {
    userId: string;
    userName: string;
    userSurname: string;
    fullname: string;
    registerDate: number;
    userAvatar: string;
    userGender: string;
    userBirthday: Birthday;
    userFamStatus: string;
    userCity: string;
    userCountry: string;
    userInterests: string[];
    userAbout: string;
    chatBackground: string;
    friends: string[];
    photos: Photo[],
    chats: Chat[],
}


export interface Birthday {
    fullDate: string;
    age: number;
    year: number;
    month: number;
    day: number;
}
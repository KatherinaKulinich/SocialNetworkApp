import { db } from "firebase"
import { setDoc, doc } from "firebase/firestore"
import { Chat } from "types/Chat"
import { Photo } from "types/Photo";
import { Post } from "types/Post";
import { Friend } from "types/UserProfile";




export const createUserProfile = async (userId:string) => {
    const currentDate = Date.now();

    await setDoc(doc(db, 'users', userId), {
        personalData: {
            userId: userId,
            userName: '',
            userSurname: '',
            userFullname: '',
        },
        profileData: {
            userAvatar: '',
            userGender: '',
            userFamStatus: '',
            userCity: '',
            userCountry: '',
            userLocation: '',
            userInterests: [],
            userAbout: '',
            userBirthday: {
                fullDate: '',
                year: null,
                month: null,
                day: null,
            }
        },
        content:  {
            photos: [] as Photo[],
            posts: [] as Post[],
        },
        contacts: {
            friends: [] as Friend[],
            friendRequests: [],
            followingList: [],
            followers: [],
        },
        additionalData: {
            registerDate: currentDate,
            chatBackground: 'default',
        },
        chats: [] as Chat[],
    })
}
import { Photo } from "./Photo";
import { Post } from "./Post";
import { UserProfile } from "./UserProfile";



export interface FriendShortData {
    id: string,
    name: string,
    avatar:string,
    date: number,
}




export interface FeedPost {
    user: UserProfile,
    post: Post,
    date: number,
}

export interface FeedPhoto {
    user: UserProfile,
    photo: Photo,
    date: number,
}

export interface FeedFriendship {
    user: UserProfile,
    friend: FriendShortData,
    date:number
}
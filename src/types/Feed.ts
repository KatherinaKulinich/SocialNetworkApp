import { Photo } from "./Photo";
import { Post } from "./Post";
import { UserProfile } from "./UserProfile";



// export interface UserShortData {
//     userId: string,
//     userFullname: string,
//     userAvatar: string,
// }

export interface FriendShortData {
    id: string,
    name: string,
}




export interface FeedPost {
    user: UserProfile,
    post: Post,
}

export interface FeedPhoto {
    user: UserProfile,
    photo: Photo,
}

export interface FeedFriendship {
    user: UserProfile,
    friend: FriendShortData,
}
import { StorageReference } from "firebase/storage";



export interface Photo {
    photoId: string,
    photoFileRef: string;
    photoUrl: string;
    photoDescription: string;
    photoDate: number;
    photoLikes: string[],
    photoComments: CommentItem[],
}



export interface CommentItem {
    userId: string;
    userName: string;
    userAvatar: string;
    text: string;
    date: number;
}
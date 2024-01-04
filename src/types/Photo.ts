import { CommentItem } from "./Comment";



export interface Photo {
    photoId: string,
    photoFileRef: string,
    photoUrl: string,
    photoDescription: string,
    photoDate: number,
    photoLikes: Array<string>,
    photoComments: Array<CommentItem>,
}


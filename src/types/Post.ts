import { CommentItem } from "./Comment";



export interface Post {
    postId: string,
    postText: string,
    postOwnerName: string,
    postOwnerAvatar: string,
    postReactions: Array<Reaction>,
    postComments: Array<CommentItem>,
    date: any,
}


export interface Reaction {
    value: string,
    usersReactions: Array<string>,
}
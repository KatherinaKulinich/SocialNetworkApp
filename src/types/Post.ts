import { CommentItem } from "./Comment";



export interface Post {
    postId: string,
    postText: string,
    postOwnerName: string,
    postOwnerAvatar: string,
    postDate: any,
    postReactions: Array<Reaction>,
    postComments: Array<CommentItem>,
}


export interface Reaction {
    value: string,
    usersReactions: Array<string>,
}
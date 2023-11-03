import { CommentItem } from "./Photo";


export interface Post {
    postId: string,
    postText: string,
    postOwnerName: string,
    postOwnerAvatar: string,
    postDate: any,
    postReactions: Reaction[]
    postComments: CommentItem[],
}

export interface Reaction {
    value: string;
    usersReactions: string[]
}
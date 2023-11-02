import { Comment } from "./Photo";


export interface Post {
    postId: string,
    postText: string,
    postOwnerName: string,
    postOwnerAvatar: string,
    postDate: any,
    postReactions: Reaction[]
    postComments: Comment[],
}

export interface Reaction {
    value: string;
    usersReactions: string[]
}
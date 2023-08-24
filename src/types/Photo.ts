export interface Photo {
    url: string;
    description: string;
    date: number;
    likes: string[],
    comments: Comment[],
}

export interface Comment {
    userId: string;
    userName: string;
    userAvatar: string;
    text: string;
    date: number;
}
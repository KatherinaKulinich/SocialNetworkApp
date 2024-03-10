export interface Chat {
    chatId: string,
    user: ChatUserData,
    updatedAt: number,
    lastMessage: LastMessageInfo,
    userIsTyping?: boolean,
}



interface ChatUserData {
    userId: string,
    userName: string,
    userFullname: string,
    userAvatar: string,
}

interface LastMessageInfo {
    senderName: string | null,
    text: string | null,
    messageHasRead?: boolean,
}
import { db } from "firebase"
import { DocumentData, DocumentReference, addDoc, collection, doc, updateDoc} from "firebase/firestore"
import { useAppDispatch, useAppSelector } from "hooks/hooks"
import { fetchChatData } from "rdx/slices/chatSlice"
import { fetchUserFullData } from "rdx/slices/userDataSlice"
import { fetchSelectedUserData } from "rdx/slices/usersSlice"
import { useCallback, useEffect, useState } from "react"
import { Chat } from "types/Chat"
import { UserProfile } from "types/UserProfile"



export const useChatChecking = (user:UserProfile) => {

    const dispatch = useAppDispatch()
    const myData = useAppSelector(state => state.userData.user)

    const myChats = myData?.chats || []
    const {userId:myId, userName:myName, userFullname:myFullname} = myData?.personalData ?? {}
    const { userAvatar:myAvatar } = myData?.profileData ?? {}

    const userChats = user?.chats
    const { userId, userName, userFullname } = user?.personalData ?? {}
    const { userAvatar } = user?.profileData ?? {}

    const myRef:DocumentReference<DocumentData, DocumentData> = doc(db, 'users', myId as string) 
    const userRef:DocumentReference<DocumentData, DocumentData> = doc(db, 'users', userId as string)


    const [isSelectedChat, setIsSelectedChat] = useState<Chat>({} as Chat)

    const getChatWithUser = useCallback((chats: Chat[], id:string) => {
        const chat = chats.find(chat => chat.user.userId === id)
        if (chat) {
            setIsSelectedChat(chat)
            return chat
        }
    }, [])



    const checkChatAvailability = useCallback(async (chats: Chat[], id: string) => {
        const chat = chats.some(chat => chat.user.userId === id)

        if (chat) {
            const chatData = getChatWithUser(chats, id) || {} as Chat
            return chatData
        }
        return false
    }, [])



    const refreshUsersData = useCallback(() => {
        dispatch(fetchUserFullData(myId))
        dispatch(fetchSelectedUserData(userId))
    }, [user, myData])



    const createNewChatWithUser = useCallback(async () => {
        const docRef = await addDoc(collection(db, 'chats'), {
            messages: [],
        })

        const chatId = docRef.id
        const currentTime = Date.now()
        const newChat = {
            chatId: chatId,
            updatedAt: currentTime,
            lastMessage: {
                senderName: null,
                text: null,
            },
        }

        const myNewChat:Chat = {...newChat, user: {
            userId,
            userName,
            userAvatar, 
            userFullname,
        }}
        const userNewChat:Chat = {...newChat, user: {
            userId: myId,
            userName: myName,
            userAvatar: myAvatar,
            userFullname: myFullname,
        }} 
        const userUpdatedChats = [...userChats, userNewChat]
        const myUpdatedChats = [...myChats, myNewChat]

        await updateDoc(myRef, {
            chats: myUpdatedChats
        })
        await updateDoc(userRef, {
            chats: userUpdatedChats
        })
        refreshUsersData()
        return chatId
    }, [myData, user])


    const openChatWithUser = useCallback(async () => {
        checkChatAvailability(myChats, userId).then((data) => {
            if (!data) {
                createNewChatWithUser()
                .then((chatId) => {
                    dispatch(fetchChatData(chatId))
                })
                return
            }
            dispatch(fetchChatData(data.chatId))
        })
    }, [isSelectedChat])


    useEffect(() => {
        const chat = getChatWithUser(myChats, userId)
        if (chat) {
            setIsSelectedChat(chat)
        }
    }, [myChats, userId])


    return {
        openChatWithUser,
        isSelectedChat,
        getChatWithUser
    }
}
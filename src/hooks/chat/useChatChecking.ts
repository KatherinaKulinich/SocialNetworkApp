import { db } from "firebase"
import { DocumentData, DocumentReference, addDoc, collection, doc, updateDoc} from "firebase/firestore"
import { useAppDispatch, useAppSelector } from "hooks/hooks"
import { fetchChatData } from "rdx/slices/chatSlice"
import { fetchUserFullData } from "rdx/slices/userDataSlice"
import { fetchSelectedUserData } from "rdx/slices/usersSlice"
import { useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { Chat } from "types/Chat"
import { UserProfile } from "types/UserProfile"



export const useChatChecking = (user:UserProfile) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const myData = useAppSelector(state => state.userData.user)

    const myChats = myData?.chats || []
    const {userId:myId, userName:myName} = myData?.personalData ?? {}
    const { userAvatar:myAvatar } = myData?.profileData ?? {}

    const userChats = user?.chats
    const { userId, userName, userFullname } = user?.personalData ?? {}
    const { userAvatar } = user?.profileData ?? {}

    const myRef:DocumentReference<DocumentData, DocumentData> = doc(db, 'users', myId as string) 
    const userRef:DocumentReference<DocumentData, DocumentData> = doc(db, 'users', userId as string)



    const checkChatAvailability = useCallback(async (chats: Chat[], id: string) => {
        if (chats?.length > 0) {
            for (const chat of chats) {
                if (chat.user.userId === id) return chat
                return false
            }
            return
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
        }}
        const userNewChat:Chat = {...newChat, user: {
            userId: myId,
            userName: myName,
            userAvatar: myAvatar
        }}
        console.log('myChats', myChats);
        
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
        console.log('myChats', myChats);
        const isChat = await checkChatAvailability(myChats, userId)
        console.log(isChat);

        if (isChat !== undefined) {
            if (isChat === false) {
                
                createNewChatWithUser()
                .then((chatId) => {
                    dispatch(fetchChatData(chatId))
                })
                // .then(() => {
                //     navigate(`myChats/${userFullname}/chat`)
                // })
                return
            } 
            dispatch(fetchChatData(isChat.chatId))
            // navigate(`myChats/${userFullname}/chat`)
        }
    }, [myChats, userId])

    




    return {
        openChatWithUser
    }
}
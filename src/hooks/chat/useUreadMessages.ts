import { db } from "firebase"
import { doc, updateDoc } from "firebase/firestore"
import { useCallback, useEffect, useState } from "react"
import { Chat } from "types/Chat"
import { UserProfile } from "types/UserProfile"
import { useAppDispatch } from "hooks/hooks";
import { fetchUserFullData } from "rdx/slices/userDataSlice"
 


export const useUnreadMessages = (myData:UserProfile) => {
    const myChats = myData?.chats
    const myId = myData?.personalData?.userId
    const dispatch = useAppDispatch()

    const [areUnreadMessages, setAreUnreadMessages] = useState<Array<string>>([])



    const checkNewUnreadChatsIds = useCallback(async () => {
        myChats?.forEach((chat) => {
            const myField = chat?.newUnreadMessages[myId]
            if (myField === true) {
                setAreUnreadMessages(prev => [...prev, chat.chatId])
            }
            return chat
        })
    }, [myChats])

    useEffect(() => {
        checkNewUnreadChatsIds()
    }, [myChats])


    const checkChatForNewMessages = useCallback((id:string) => {
        if (areUnreadMessages.includes(id)) return true
        return false
    },[areUnreadMessages, myData])


    const markChatAsRead = useCallback(async (id:string) => {
        const myUpdatedChats = myChats?.map((chat:Chat) => {
            if (chat.chatId === id) {
                
                return {
                    ...chat,
                    newUnreadMessages: {
                        [myId]: false, 
                    }
                }
            }
            return chat
        })

        const myRef = doc(db, 'users', myId)
        await updateDoc(myRef, {
            chats: myUpdatedChats
        })
        await dispatch(fetchUserFullData(myId))
    }, [myData, areUnreadMessages])







    return {
        areUnreadMessages,
        checkChatForNewMessages,
        markChatAsRead
    }
}
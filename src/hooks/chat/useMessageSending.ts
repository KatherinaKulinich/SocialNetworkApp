
import { message } from "antd";
import { db, storage } from "firebase";
import { Timestamp, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useAppDispatch } from "hooks/hooks";
import { fetchChatData } from "rdx/slices/chatSlice";
import { fetchUserFullData } from "rdx/slices/userDataSlice";
import { fetchSelectedUserData } from "rdx/slices/usersSlice";
import { useCallback, useState } from "react"
import { Chat } from "types/Chat";
import { ChatMessageItem } from "types/ChatMessage";
import { UserProfile } from "types/UserProfile";
import { v4 as uuidv4 } from 'uuid'





export const useMessageSending = (chat:Chat, user:UserProfile, myData:UserProfile) => {
    const dispatch = useAppDispatch()

    const { userId:myId, userName:myName } = myData?.personalData ?? {}
    const { userId } = user?.personalData ?? {}
    const { chats: userChats } = user
    const { chats: myChats } = myData

    const userRef = doc(db, 'users', userId)
    const myRef = doc(db, 'users', myId)


    const [isImageLoading, setIsImageLoading] = useState<boolean>(false)






    const getURL = useCallback(async (image:File, chat:Chat) => {
        const {chatId} = chat ?? {};
        const imgStorageUrl = `chats/${chatId}/${myId}/${image.name}`;
        const imgRef = ref(storage, imgStorageUrl); 
        const metadata = {
            contentType: image.type,  
        };
        let downloadURL:string = ''

        await uploadBytesResumable(imgRef, image as Blob, metadata)
        .then(async () => {
            downloadURL = await getDownloadURL(imgRef)
            return downloadURL
        })
        return downloadURL
    }, [])


  

    const updateChatsArray = useCallback((chats:Chat[], timeUpdated:number, textValue:string, isNewMessageForUser:boolean) => {
        const text = textValue.length > 0 ? textValue : 'sent an image'
        const {chatId} = chat;

        const updatedChats:Chat[] = chats.map(chat => {
            if (chat.chatId === chatId) {

                return {
                    ...chat, 
                    updatedAt: timeUpdated,
                    lastMessage: {
                        senderName: myName,
                        text,
                    }, 
                    newUnreadMessages: {
                        [userId]: isNewMessageForUser,
                        [myId]: false,
                    }
                }
            }

            return chat
        })

        return updatedChats
    }, [myData, user])



    const sendNewMessage = useCallback(async (image:File | null | undefined, textValue: string, chat:Chat) => {
        if (chat) {

            const messageId = uuidv4();
            const createdAt = Date.now();
            const {chatId} = chat;
            const chatRef = doc(db, 'chats', chatId)
    
            let newMessage:ChatMessageItem = {
                messageId,
                messageText: textValue,
                createdAt,
                senderId: myId,
            }
    
            if (image) {
                setIsImageLoading(true)
                const url = await getURL(image, chat)
                newMessage.messageImg = url
                setIsImageLoading(false)
            }
    
            const updatedMyChats = updateChatsArray(myChats, createdAt, textValue, false)
            const updatedUserChats = updateChatsArray(userChats, createdAt, textValue, true)
    
    
            await updateDoc(chatRef, {
                messages: arrayUnion(newMessage)
            })
            await updateDoc(userRef, {
                chats: updatedUserChats
            })
            await updateDoc(myRef, {
                chats: updatedMyChats
            })
            await dispatch(fetchChatData(chatId))
            await dispatch(fetchUserFullData(myId))
            await dispatch(fetchSelectedUserData(userId))
        }
    }, [myData, user, chat])



    return {
        sendNewMessage, 
        isImageLoading
    }
}
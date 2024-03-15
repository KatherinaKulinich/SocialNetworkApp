import { db, storage } from "firebase"
import { deleteDoc, doc, updateDoc } from "firebase/firestore"
import { deleteObject, getDownloadURL, listAll, ref } from "firebase/storage"
import { useCallback, useEffect, useState } from "react"
import { UserProfile } from "types/UserProfile"
import { useAppDispatch } from "hooks/hooks";
import { fetchUserFullData } from "rdx/slices/userDataSlice"
import { fetchSelectedUserData } from "rdx/slices/usersSlice"
import {  useNavigate } from 'react-router-dom';
import { message } from "antd"



export const useChatManagement = (chatId:string, myData:UserProfile, user:UserProfile) => {
    const { chats: userChats } = user
    const { chats: myChats } = myData
    const { userId:myId } = myData?.personalData ?? {}
    const { userId, userName } = user?.personalData ?? {}

    const userRef = doc(db, 'users', userId)
    const myRef = doc(db, 'users', myId)

    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    const [myImagesURLs, setMyImagesURLs] = useState<Array<string>>([])
    const [userImagesURLs, setUserImagesURLs] = useState<Array<string>>([])
    const [isFilesLoading, setIsFilesLoading] = useState<boolean>(false)




    const getChatMediaFiles = useCallback(async (id:string) => {
        setIsFilesLoading(true)

        const storageRef = ref(storage, `chats/${chatId}/${id}`)
        const result = await listAll(storageRef);

        const urlPromises = result.items.map((imageRef) => getDownloadURL(imageRef));
        return Promise.all(urlPromises)
    }, [chatId])



    const deleteChat = useCallback(async () => {
        if (chatId) {
            const filesRef = ref(storage, `chats/${chatId}`)
            const chatRef = doc(db, 'chats', chatId)
    
            const updatedUserChats = userChats.filter(chat => chat.chatId !== chatId)
            const updatedMyChats = myChats.filter(chat => chat.chatId !== chatId)
            

            await updateDoc(userRef, {
                chats: updatedUserChats
            })
            await updateDoc(myRef, {
                chats: updatedMyChats
            })
            await dispatch(fetchUserFullData(myId))
            await dispatch(fetchSelectedUserData(userId))
            
            navigate('/myChats')
            message.success(`Chat with ${userName} successfully deleted!`)
            

            await deleteDoc(chatRef)

            await listAll(filesRef)
            .then((result) => {
                result.prefixes.forEach((folderRef) => {
                    const folderPath  = ref(storage, folderRef.fullPath) 

                    listAll(folderPath)
                    .then((files) => {
                        files.items.map((file) => {
                            const imgRef = ref(storage, file.fullPath)
                            deleteObject(imgRef)
                        })                       
                    })                   
                })
            })
        }

    }, [chatId])

    const getAllMediaFiles = useCallback(async () => {
        const myImages = await getChatMediaFiles(myId)
        const userImages = await getChatMediaFiles(userId)

        setMyImagesURLs(myImages)
        setUserImagesURLs(userImages) 
    }, [myId, chatId, userId])

    useEffect(() => {
        getAllMediaFiles()
    }, [chatId, myId, userId, myData])


    return {
        deleteChat,
        myImagesURLs,
        userImagesURLs
    }
}
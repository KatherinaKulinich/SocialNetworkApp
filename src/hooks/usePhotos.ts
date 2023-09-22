import { useCallback, useEffect, useState } from "react"
import { useAuth } from "./useAuth"
import { useUserData } from "./useUserData"
import { message } from "antd"
import { db, storage } from "firebase"
import { addDoc, collection, doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore"
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage"
import { Photo } from "types/Photo"
import {v4 as uuidv4} from 'uuid'
import { useAppDispatch, useAppSelector } from "./hooks"
import { fetchUserFullData } from "rdx/slices/userDataSlice"
import { UserFullData } from "types/UserFullDataType"



export const usePhotos = () => {



    
    // const { userId } = useAuth()
    const { userData } = useUserData()
    const { userId, userName, photos } = userData;
    const userRef = doc(db, "users", userId);
    const dispatch = useAppDispatch()

    const selectedPhoto = useAppSelector(state => state.content.selectedPhoto)
    const {likes} = selectedPhoto;


    const addNewPhoto = useCallback(async (values:any) => {
        const { photoUpload, photoDescription } = values;

        await message.loading('Adding new photo...', 7)

        if (photoUpload?.fileList?.length || photoUpload !== undefined) {

            const newPhoto = photoUpload.fileList[0]
            const metadata = {
                contentType: newPhoto.type,  
            };

            const imgStorageUrl = `users/${userId}/photos/${userName}_photo-${newPhoto.name}`;
            const imgRef = ref(storage, imgStorageUrl); 
    
            await uploadBytesResumable(imgRef, newPhoto.originFileObj as Blob, metadata)
                .then(async ()=> {
                    const downloadURL = await getDownloadURL(imgRef)
                    const id = uuidv4();

                    const photoObj:Photo = {
                        photoId: id,
                        fileRef: imgStorageUrl,
                        url: downloadURL,
                        description: photoDescription,
                        date: Date.now(),
                        likes: [],
                        comments: [],
                    }


                    if (photos !== undefined) {
                        const newUserPhotos:Photo[] = [...photos, photoObj]

                        await updateDoc(userRef, {
                            photos: newUserPhotos,
                        });
                        // await setDoc(userRef, photoObj)
                        await dispatch(fetchUserFullData(userId))
                        await message.success('Added!')
                    }


                })
        }
    }, [photos, dispatch])


    const editUserPhoto = useCallback(async (newValue: string, photo: Photo) => {
        const newPhotosArray = photos?.map((item:Photo) => {
            if (item.photoId === photo.photoId) {
                return {...item, description: newValue}
            }
            return item
        })

        await message.loading('Changing description...')
        await updateDoc(userRef, {
            photos: newPhotosArray,
        })
        await message.success('Done!')

    }, [photos, userData])





    const deleteUserPhoto = useCallback((photo:Photo) => {
        const { fileRef, photoId } = photo;
        const photoRef = ref(storage, fileRef);
        
        const newPhotos = photos?.filter((photoItem:Photo) => {
            return photoItem.photoId !== photoId
        })

        updateDoc(userRef, {
            photos: newPhotos,
        })

        deleteObject(photoRef)
            .then(() => {
                message.success('Photo has been deleted')
            })
            .catch((error:any) => {
                message.error('something went wrong! Try again!')
            })
   
    }, [ photos, selectedPhoto, userData])




    const checkUserLikeReaction = useCallback((userId:string, photo: Photo) => {
        if (photo?.likes?.includes(userId)) {
            return true
        }
        return false
    }, [userData])
        


    const addLike = useCallback((userId:string, photo:Photo) => {
        const newLikesArray = [...photo.likes, userId]
        console.log(newLikesArray);
        

        const updatedPhoto:Photo = {...photo, likes: newLikesArray};
        const updatedPhotoArray = photos?.map((photo:Photo) => {
            if (photo.photoId === updatedPhoto.photoId) {
                return updatedPhoto
            }
            return photo
        })
        console.log(updatedPhotoArray);

        updateDoc(userRef, {
            photos: updatedPhotoArray,
        })
    }, [userData])


    const removeLike = useCallback((userId:string, photo:Photo) => {
        const newLikesArray = photo?.likes.filter(like => like !== userId)
        const updatedPhoto:Photo = {...photo, likes: newLikesArray};

        const updatedPhotoArray = photos?.map((photo:Photo) => {
            if (photo.photoId === updatedPhoto.photoId) {
                return updatedPhoto
            }
            return photo
        })

        updateDoc(userRef, {
            photos: updatedPhotoArray,
        })

    }, [userData])


    const onToggleLike = useCallback((userId:string, photo:Photo) => {
        const isLike = checkUserLikeReaction(userId, photo)
        console.log('isLike', checkUserLikeReaction(userId, photo) );
        

        if (isLike === true) {
            removeLike(userId, photo)
        } else if (isLike === false) {
            addLike(userId, photo)
        }

    }, [userData])



    const sendNewComment = useCallback((newCommentText:string, photo:Photo, user:UserFullData) => {
        const { userId, fullname, userAvatar } = user;
        const commentsArray = photo.comments
        const newCommentsArray = [...commentsArray, {
            userId,
            userName: fullname,
            userAvatar,
            text: newCommentText,
            date: Date.now(),
        }]

        const updatedPhoto:Photo = {...photo, comments: newCommentsArray};
        const updatedPhotoArray = photos?.map((photo:Photo) => {
            if (photo.photoId === updatedPhoto.photoId) {
                return updatedPhoto
            }
            return photo
        })

        updateDoc(userRef, {
            photos: updatedPhotoArray,
        })

    }, [userData, photos])

    return {
        addNewPhoto,
        selectedPhoto,
        deleteUserPhoto,
        editUserPhoto,
        checkUserLikeReaction,
        onToggleLike,
        sendNewComment
    }
}
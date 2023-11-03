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
import { Post } from "types/Post"



export const usePhotosLikes = () => {

    const { userData } = useUserData()
    const { userId, userName, photos } = userData;
    
    const userRef = doc(db, "users", userId);
    const dispatch = useAppDispatch()

    const selectedPhoto = useAppSelector(state => state.content.selectedPhoto)
    const {photoLikes} = selectedPhoto;




    const checkUserLikeReaction = useCallback((photo: Photo) => {
        if (photo?.photoLikes?.includes(userId)) {
            return true
        }
        return false
    }, [userData])
        


    const addLike = useCallback((userId:string, photo:Photo) => {
        const newLikesArray = [...photo.photoLikes, userId]
        console.log(newLikesArray);
        

        const updatedPhoto:Photo = {...photo, photoLikes: newLikesArray};
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
        const newLikesArray = photo?.photoLikes.filter(like => like !== userId)
        const updatedPhoto:Photo = {...photo, photoLikes: newLikesArray};

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



    // const sendNewComment = useCallback((newCommentText:string, photo:Photo, user:UserFullData) => {
    //     const { userId, fullname, userAvatar } = user;
    //     const commentsArray = photo.photoComments
    //     const newCommentsArray = [...commentsArray, {
    //         userId,
    //         userName: fullname,
    //         userAvatar,
    //         text: newCommentText,
    //         date: Date.now(),
    //     }]

    //     const updatedPhoto:Photo = {...photo, photoComments: newCommentsArray};
    //     const updatedPhotoArray = photos?.map((photo:Photo) => {
    //         if (photo.photoId === updatedPhoto.photoId) {
    //             return updatedPhoto
    //         }
    //         return photo
    //     })

    //     updateDoc(userRef, {
    //         photos: updatedPhotoArray,
    //     })

    // }, [userData, photos])


    
    return {
        // addNewPhoto,
        // selectedPhoto,
        // deleteUserPhoto,
        // editUserPhoto,
        checkUserLikeReaction,
        onToggleLike,
        // sendNewComment
    }
}
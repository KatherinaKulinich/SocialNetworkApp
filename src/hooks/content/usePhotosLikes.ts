import { useCallback } from "react"
import { db } from "firebase"
import { 
    DocumentData, 
    DocumentReference, 
    doc, 
    updateDoc 
} from "firebase/firestore"
import { Photo } from "types/Photo"
import {useAppDispatch } from "../hooks"
import { fetchUserFullData } from "rdx/slices/userDataSlice"
import { fetchSelectedUserData } from "rdx/slices/usersSlice"
import { useCheckMyContentReaction } from "./useCheckMyContentReaction"
import { UserProfile } from "types/UserProfile"
import { fetchFriends } from "rdx/slices/friendsSlice"
import { fetchRandomUsers } from "rdx/slices/randomUsersSlice";
import { useMyFullData } from "hooks/useMyFullData"





export const usePhotosLikes = () => {
    const dispatch = useAppDispatch()

    const myData = useMyFullData()
    const { checkMyPhotoLike } = useCheckMyContentReaction(myData)

    const { userId:myId } = myData?.personalData ?? {};
    const { friends, followers } = myData?.contacts ?? {}
    const friendsIds = friends?.map(friend => friend.id) || []
    const { userCity, userCountry } = myData?.profileData ?? {}


    const refreshUsersData = useCallback((userId:string) => {
        if (myId && userId) {
            dispatch(fetchUserFullData(myId))
            dispatch(fetchSelectedUserData(userId))
            dispatch(fetchFriends(friendsIds, 'friends'))
            dispatch(fetchFriends(followers, 'followers'))
            dispatch(fetchRandomUsers(userCountry, userCity, myId))
        }
    }, [dispatch, myData])



    const updatePhotos = useCallback(async (user:UserProfile, updatedPhoto:Photo, ref:DocumentReference<DocumentData, DocumentData>) => {
        const { userId } = user.personalData ?? {};
        const { photos:userPhotos } = user?.content ?? {};
        
        const updatedPhotoArray = userPhotos?.map((photo:Photo) => {
            if (photo.photoId === updatedPhoto.photoId) {
                return updatedPhoto
            }
            return photo
        })
        await updateDoc(ref, {
            "content.photos": updatedPhotoArray,
        })
        refreshUsersData(userId)     
    }, [])



    const addLikeToPhoto = useCallback((selectedPhoto:Photo, photoOwner:UserProfile) => {
        const { userId } = photoOwner?.personalData ?? {};
        if (userId) {
            const userRef = doc(db, "users", userId);
    
            const newLikesArray = [...selectedPhoto.photoLikes, myId]
            const updatedPhoto: Photo = {...selectedPhoto, photoLikes: newLikesArray}
     
            updatePhotos(photoOwner, updatedPhoto, userRef)
        }
    }, [])



    const removeLikeFromPhoto = useCallback((selectedPhoto:Photo, photoOwner:UserProfile) => {
        const { userId } = photoOwner?.personalData ?? {};
        if (userId) {
            const userRef = doc(db, "users", userId);
    
            const newLikesArray = selectedPhoto?.photoLikes.filter(like => like !== myId)
            const updatedPhoto:Photo = {...selectedPhoto, photoLikes: newLikesArray};
    
            updatePhotos(photoOwner, updatedPhoto, userRef)
        }
    }, [])




    const togglePhotoLike = useCallback((selectedPhoto:Photo, photoOwner:UserProfile) => {
        const isPhotoLiked = checkMyPhotoLike(selectedPhoto)

        if (isPhotoLiked) {
            removeLikeFromPhoto(selectedPhoto, photoOwner)
        } else {
            addLikeToPhoto(selectedPhoto, photoOwner)
        }   
    },[])
        


    
    return {
        togglePhotoLike
    }
}
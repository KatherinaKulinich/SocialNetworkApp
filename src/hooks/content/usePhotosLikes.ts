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






export const usePhotosLikes = (photoOwnerUser: UserProfile, userIsMe:UserProfile) => {
    const { checkMyPhotoLike } = useCheckMyContentReaction(userIsMe)
    const dispatch = useAppDispatch()

    const { userId } = photoOwnerUser?.personalData ?? {};
    const { photos:userPhotos } = photoOwnerUser?.content ?? {};

    const { userId:myId } = userIsMe?.personalData ?? {};
    const { friends, followers } = userIsMe?.contacts ?? {}
    const friendsIds = friends?.map(friend => friend.id) || []
    const { userCity, userCountry } = userIsMe?.profileData ?? {}

    const userRef = doc(db, "users", userId);

    const refreshUsersData = useCallback(() => {
        if (myId && userId) {
            dispatch(fetchUserFullData(myId))
            dispatch(fetchSelectedUserData(userId))
            dispatch(fetchFriends(friendsIds, 'friends'))
            dispatch(fetchFriends(followers, 'followers'))
            dispatch(fetchRandomUsers(userCountry, userCity, myId))
        }
    }, [])



    const updatePhotos = useCallback(async (userPhotos:Photo[], updatedPhoto:Photo, ref:DocumentReference<DocumentData, DocumentData>) => {
        const updatedPhotoArray = userPhotos?.map((photo:Photo) => {
            if (photo.photoId === updatedPhoto.photoId) {
                return updatedPhoto
            }
            return photo
        })
        await updateDoc(ref, {
            "content.photos": updatedPhotoArray,
        })
        if (myId && userId) {
            dispatch(fetchUserFullData(myId))
            dispatch(fetchSelectedUserData(userId))
            dispatch(fetchFriends(friendsIds, 'friends'))
            dispatch(fetchFriends(followers, 'followers'))
            dispatch(fetchRandomUsers(userCountry, userCity, myId))
        }
        // refreshUsersData()
    }, [])



    const addLikeToPhoto = useCallback((selectedPhoto:Photo) => {
        const newLikesArray = [...selectedPhoto.photoLikes, myId]
        const updatedPhoto: Photo = {...selectedPhoto, photoLikes: newLikesArray}
 
        updatePhotos(userPhotos as Photo[], updatedPhoto, userRef)
    }, [userPhotos])



    const removeLikeFromPhoto = useCallback((selectedPhoto:Photo) => {
        const newLikesArray = selectedPhoto?.photoLikes.filter(like => like !== myId)
        const updatedPhoto:Photo = {...selectedPhoto, photoLikes: newLikesArray};

        updatePhotos(userPhotos as Photo[], updatedPhoto, userRef)
    }, [userPhotos])




    const togglePhotoLike = useCallback((selectedPhoto:Photo) => {
        const isPhotoLiked = checkMyPhotoLike(selectedPhoto)

        if (isPhotoLiked) {
            removeLikeFromPhoto(selectedPhoto)
            return
        } 
        addLikeToPhoto(selectedPhoto)
    },[userPhotos])
        


    
    return {
        togglePhotoLike
    }
}
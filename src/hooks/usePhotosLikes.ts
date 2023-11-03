import { useCallback } from "react"
import { useUserData } from "./useUserData"
import { db } from "firebase"
import { DocumentData, DocumentReference, doc, updateDoc } from "firebase/firestore"
import { Photo } from "types/Photo"
import { UserFullData } from "types/UserFullDataType"




export const usePhotosLikes = () => {
    const { userData } = useUserData()
    const { userId:myId, userName, photos:myPhotos } = userData;
    const myRef = doc(db, "users", myId);
    


    const checkUserLikeReaction = useCallback((photo: Photo) => {
        if (photo?.photoLikes?.includes(myId)) {
            return true
        }
        return false
    }, [userData])


    
    const updatePhotos = useCallback((photos:Photo[], updatedPhoto:Photo, ref:DocumentReference<DocumentData, DocumentData>) => {
        const updatedPhotoArray = photos?.map((photo:Photo) => {
            if (photo.photoId === updatedPhoto.photoId) {
                return updatedPhoto
            }
            return photo
        })
        updateDoc(myRef, {
            photos: updatedPhotoArray,
        })
    }, [])
        



    const addLike = useCallback((photo:Photo, user:UserFullData) => {
        const { userId, photos:userPhotos } = user;
        const userRef = doc(db, "users", userId);

        const newLikesArray = [...photo.photoLikes, myId]
        const updatedPhoto:Photo = {...photo, photoLikes: newLikesArray};

        if (myId === userId) {
            updatePhotos(myPhotos as Photo[], updatedPhoto, myRef)
            return
        }
        updatePhotos(userPhotos as Photo[], updatedPhoto, userRef)
    }, [userData])



    const removeLike = useCallback((photo:Photo, user:UserFullData) => {
        const { userId, photos:userPhotos } = user;
        const userRef = doc(db, "users", userId);

        const newLikesArray = photo?.photoLikes.filter(like => like !== userId)
        const updatedPhoto:Photo = {...photo, photoLikes: newLikesArray};

        if (myId === userId) {
            updatePhotos(myPhotos as Photo[], updatedPhoto, myRef)
            return
        }
        updatePhotos(userPhotos as Photo[], updatedPhoto, userRef)
    }, [userData])



    const onToggleLike = useCallback((photo:Photo, user:UserFullData) => {
        const isLike = checkUserLikeReaction(photo)
        // console.log('isLike', checkUserLikeReaction(photo) );
        
        if (isLike === true) {
            removeLike(photo, user)
        } else if (isLike === false) {
            addLike(photo, user)
        }

    }, [userData])


    
    return {
        checkUserLikeReaction,
        onToggleLike,
    }
}
import { useCallback } from "react"
import { db } from "firebase"
import { 
    DocumentData, 
    DocumentReference, 
    doc, 
    updateDoc 
} from "firebase/firestore"
import { Photo } from "types/Photo"
import { useCheckMyContentReaction } from "./useCheckMyContentReaction"
import { UserProfile } from "types/UserProfile"
import { useAppSelector } from "hooks/hooks"






export const usePhotosLikes = () => {
    const myData = useAppSelector(state => state.userData.user)
    const { userId:myId } = myData?.personalData ?? {};
    
    const { checkMyPhotoLike } = useCheckMyContentReaction(myData)


    const updatePhotos = useCallback(async (user:UserProfile, updatedPhoto:Photo, ref:DocumentReference<DocumentData, DocumentData>) => {
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
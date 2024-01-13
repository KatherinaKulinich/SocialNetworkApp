import { message } from "antd"
import { useCallback } from "react"
import { db, storage } from "firebase"
import { doc, updateDoc } from "firebase/firestore"
import { Post } from "types/Post"
import { fetchUserFullData } from "rdx/slices/userDataSlice"
import { useAppDispatch, useAppSelector } from "../hooks"
import { Photo } from "types/Photo"
import { ref, deleteObject } from "firebase/storage"
import { UserProfile } from "types/UserProfile"





export const useManageMyContent = () => {
    const userData:UserProfile = useAppSelector(state => state.userData.user)
    const { personalData, content } = userData;
    const { userId } = personalData;
    const { posts, photos} = content;

    const userRef = doc(db, "users", userId);
    const dispatch = useAppDispatch()

 

    const editMyContent = useCallback(async(value: string, item:Post | Photo) => {
        await message.loading('Updating...')

        if ('postId' in item) {
            const newPostsArray = posts?.map((post:Post) => {
                if (item.postId === post.postId) {
                    return {...post, postText: value}
                }
                return post
            })
            await updateDoc(userRef, {
                "content.posts": newPostsArray,
            })
            dispatch(fetchUserFullData(userId))
        } else if ('photoId' in item) {
            const newPhotosArray = photos?.map((photo:Photo) => {
                if (photo.photoId === item.photoId) {
                    return {...photo, photoDescription: value}
                }
                return photo
            })
            await updateDoc(userRef, {
                "content.photos": newPhotosArray,
            })
            dispatch(fetchUserFullData(userId))
        }
        await message.success('Updated!')
    }, [photos, posts])
    



    const deleteMyContent = useCallback(async (item:Post | Photo) => {
        await message.loading('Deleting...')

        if ('postId' in item) {
            const newPostsArray = posts?.filter((post:Post) => {
                return post.postId !== item.postId
            })
            await updateDoc(userRef, {
               " content.posts": newPostsArray,
            })
            await message.success('Post has been deleted!')
        } else if ('photoId' in item) {
            const { photoFileRef, photoId } = item;
            const photoRef = ref(storage, photoFileRef);
            
            const newPhotos = photos?.filter((photo:Photo) => {
                return photo.photoId !== photoId
            })

            await updateDoc(userRef, {
                "content.photos": newPhotos,
            })
            dispatch(fetchUserFullData(userId))
            
            deleteObject(photoRef)
            .then(() => {
                message.success('Photo has been deleted')
            })
            .catch((error:any) => {
                message.error('something went wrong! Try again!')
            })
        }
    }, [photos, posts])


    return {
        editMyContent,
        deleteMyContent,
    }
}
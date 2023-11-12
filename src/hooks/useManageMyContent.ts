import { message } from "antd"
import { useCallback, useEffect } from "react"
import { reactionsArray } from "utils/profileOptions"
import {v4 as uuidv4} from 'uuid'
// import { useUserData } from "./useUserData"
import { db, storage } from "firebase"
import { doc, updateDoc } from "firebase/firestore"
import { Post, Reaction } from "types/Post"
import { fetchUserFullData } from "rdx/slices/userDataSlice"
import { useAppDispatch, useAppSelector } from "./hooks"
import { CommentItem, Photo } from "types/Photo"
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage"
import { UserFullData } from "types/UserFullDataType"





export const useManageMyContent = () => {
    // const { userData } = useUserData()
    const userData = useAppSelector(state => state.userData.user)
    const { userId, userName, userAvatar, posts, photos} = userData;
    const userRef = doc(db, "users", userId);
    const dispatch = useAppDispatch()
    



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
                const photoId = uuidv4();

                const photoObj:Photo = {
                    photoId,
                    photoFileRef: imgStorageUrl,
                    photoUrl: downloadURL,
                    photoDescription: photoDescription || '',
                    photoDate: Date.now(),
                    photoLikes: [],
                    photoComments: [] as CommentItem[],
                }

                if (photos !== undefined) {
                    const newUserPhotos:Photo[] = [...photos, photoObj]
                    await updateDoc(userRef, {
                        photos: newUserPhotos,
                    });
                    dispatch(fetchUserFullData(userId))
                    await message.success('Added!')
                }
            })
        }
    }, [photos, userData, userId])




    const addNewPost = useCallback(async (newPostText: string) => {
        await message.loading('Adding new post...', 5)
        const postId = uuidv4();
        const postReactions:Reaction[] = reactionsArray.map((item) => ({value: item.value, usersReactions: []}))

        const newPost:Post = {
            postId,
            postText: newPostText,
            postOwnerName: userName,
            postOwnerAvatar: userAvatar,
            postDate: Date.now(),
            postReactions,
            postComments: [] as CommentItem[],
        }

        
        if (posts !== undefined) {
            const updatedUserPosts:Post[] = [...posts, newPost];

            await updateDoc(userRef, {
                posts: updatedUserPosts,
            });
            dispatch(fetchUserFullData(userId))
            await message.success('Added!')
        }
    }, [posts, userData, userId])




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
                posts: newPostsArray,
            })
        } else if ('photoId' in item) {
            const newPhotosArray = photos?.map((photo:Photo) => {
                if (photo.photoId === item.photoId) {
                    return {...photo, photoDescription: value}
                }
                return photo
            })
            await updateDoc(userRef, {
                photos: newPhotosArray,
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
                posts: newPostsArray,
            })
            await message.success('Post has been deleted!')

        } else if ('photoId' in item) {

            const { photoFileRef, photoId } = item;
            const photoRef = ref(storage, photoFileRef);
            
            const newPhotos = photos?.filter((photo:Photo) => {
                return photo.photoId !== photoId
            })

            await updateDoc(userRef, {
                photos: newPhotos,
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
        addNewPhoto,
        addNewPost,
        editMyContent,
        deleteMyContent,
    }
}
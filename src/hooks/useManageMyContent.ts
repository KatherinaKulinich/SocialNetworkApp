import { message } from "antd"
import { useCallback } from "react"
import { reactionsArray } from "utils/profileOptions"
import {v4 as uuidv4} from 'uuid'
import { useUserData } from "./useUserData"
import { db, storage } from "firebase"
import { doc, updateDoc } from "firebase/firestore"
import { Post, Reaction } from "types/Post"
import { fetchUserFullData } from "rdx/slices/userDataSlice"
import { useAppDispatch } from "./hooks"
import { Photo } from "types/Photo"
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage"





export const useManageMyContent = () => {
    const { userData } = useUserData()
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
                    photoDescription: photoDescription,
                    photoDate: Date.now(),
                    photoLikes: [],
                    photoComments: [],
                }

                if (photos !== undefined) {
                    const newUserPhotos:Photo[] = [...photos, photoObj]

                    await updateDoc(userRef, {
                        photos: newUserPhotos,
                    });
                    await dispatch(fetchUserFullData(userId))
                    await message.success('Added!')
                }
            })
        }
    }, [photos, dispatch])




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
            postComments: [],
        }

        if (posts !== undefined) {
            const updatedUserPosts:Post[] = [...posts, newPost];

            await updateDoc(userRef, {
                posts: updatedUserPosts,
            });
            await dispatch(fetchUserFullData(userId))
            await message.success('Added!')
        }
    }, [posts, dispatch])




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
        }
        await message.success('Updated!')
    }, [posts, photos, userData])
    



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
        }
    }, [posts, photos, userData])


    return {
        addNewPhoto,
        addNewPost,
        editMyContent,
        deleteMyContent,
    }
}
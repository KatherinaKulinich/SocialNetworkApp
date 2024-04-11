import { message } from "antd";
import { db, storage } from "firebase";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { fetchUserFullData } from "rdx/slices/userDataSlice";
import { useCallback } from "react";
import { CommentItem } from "types/Comment";
import { Photo } from "types/Photo";
import { Reaction, Post } from "types/Post";
import { reactionsArray } from "utils/data/postReactions";
import { v4 as uuidv4 } from 'uuid'
import { useAppDispatch, useAppSelector } from "../hooks"
import { UserProfile } from "types/UserProfile"



export const useCreateNewContent = () => {
    const userData:UserProfile = useAppSelector(state => state.userData.user)
    const { personalData, profileData, content } = userData;
    const { userId, userName} = personalData;
    const { userAvatar} = profileData;
    const { posts, photos} = content;

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
                    photoLikes: [],
                    photoComments: [] as CommentItem[],
                    date: Date.now(),
                }

                if (photos !== undefined) {
                    const newUserPhotos:Photo[] = [...photos, photoObj]

                    await updateDoc(userRef, {
                        "content.photos": newUserPhotos,
                    });

                    dispatch(fetchUserFullData(userId))
                    await message.success('Added!')
                }
            })
        }
    }, [photos, userData, userId])




    const addNewPost = useCallback(async (newPostText: string) => {
        if (newPostText) {
            await message.loading('Adding new post...', 5)
            const postId = uuidv4();
            const postReactions:Reaction[] = reactionsArray.map((item) => ({value: item.value, usersReactions: []}))
    
            const newPost:Post = {
                postId,
                postText: newPostText,
                postOwnerName: userName,
                postOwnerAvatar: userAvatar,
                postReactions,
                postComments: [] as CommentItem[],
                date: Date.now(),
            }
            
            if (posts !== undefined) {
                const updatedUserPosts:Post[] = [...posts, newPost];
    
                await updateDoc(userRef, {
                    "content.posts": updatedUserPosts,
                });
    
                dispatch(fetchUserFullData(userId))
                await message.success('Added!')
            }
        } else {
            message.info('At first you should type smth..')
        }
    }, [posts, userData, userId])


    
    return {
        addNewPhoto,
        addNewPost,
    }
}
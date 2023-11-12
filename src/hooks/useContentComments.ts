import { db } from "firebase";
import { DocumentData, DocumentReference, doc, updateDoc } from "firebase/firestore";
import { useCallback } from "react";
import { CommentItem, Photo } from "types/Photo";
import { UserFullData } from "types/UserFullDataType";
import { Post } from "types/Post";
import { useAppDispatch, useAppSelector } from "./hooks";
import { fetchUserFullData } from "rdx/slices/userDataSlice";
import { fetchSelectedUserData } from "rdx/slices/usersSlice";





export const useContentComments = (contentOwner:UserFullData) => {
    const dispatch = useAppDispatch()

    const userData = useAppSelector(state => state.userData.user)

    const {userId:myId, userFullname, userAvatar, photos:myPhotos, posts:myPosts} = userData
    const { userId, posts:userPosts, photos:userPhotos } = contentOwner;
    const myRef = doc(db, "users", myId);
    const userRef = doc(db, "users", userId);


    const sendCommentPost = async (currentPost:Post, allPosts:Post[], ref: DocumentReference<DocumentData, DocumentData>, newComment:CommentItem) => {
        const selectedPost = allPosts?.find(post => post.postId === currentPost.postId)
        
        if (selectedPost) {
            const currentCommentsArray = selectedPost?.postComments;
            const newCommentsArray = [...currentCommentsArray, newComment];
            const updatedContentItem = {...selectedPost, postComments: newCommentsArray};
    
            const updatedContentArray = allPosts?.map((post:Post) => {
                if (post.postId === updatedContentItem.postId) {
                    return updatedContentItem
                }
                return post
            })
            await updateDoc(ref, {
                posts: updatedContentArray,
            })
            myId && dispatch(fetchUserFullData(myId))
            userId &&  dispatch(fetchSelectedUserData(userId))
        }
    }


    const sendCommentPhoto = async (currentPhoto:Photo, allPhotos:Photo[], ref: DocumentReference<DocumentData, DocumentData>, newComment:CommentItem) => {
        const selectedPhoto = allPhotos?.find(photo => photo.photoId === currentPhoto.photoId)

        if (selectedPhoto) {
            const currentCommentsArray = selectedPhoto?.photoComments;
    
            const newCommentsArray = [...currentCommentsArray, newComment]; 
            const updatedContentItem = {...selectedPhoto, photoComments: newCommentsArray};
    
            const updatedContentArray = allPhotos?.map((photo:Photo) => {
                if (photo.photoId === updatedContentItem.photoId) {
                    return updatedContentItem
                }
                return photo
            })

            await updateDoc(ref, {
                photos: updatedContentArray,
            })
            myId && dispatch(fetchUserFullData(myId))
            userId &&  dispatch(fetchSelectedUserData(userId))
        }
    }



    const saveContentComment = useCallback((newCommentText:string, contentItem:Post | Photo) => {
    
        const newComment:CommentItem = {
            userId,
            userName: userFullname,
            userAvatar,
            text: newCommentText,
            date: Date.now(),
        }

        if ('postId' in contentItem) {
            if (userId === myId) {
                sendCommentPost(contentItem, myPosts, myRef, newComment)
                return
            }
            sendCommentPost(contentItem, userPosts, userRef, newComment)
        } else if ('photoId' in contentItem) {
            if (userId === myId) {
                sendCommentPhoto(contentItem, myPhotos as Photo[], myRef, newComment)
                return
            }
            sendCommentPhoto(contentItem, userPhotos as Photo[], userRef, newComment)
        }

        

    }, [myPosts, myPhotos, userPhotos, userPosts, myId, userId])


    return {
        saveContentComment
    }
}
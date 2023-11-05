import { db } from "firebase";
import { DocumentData, DocumentReference, doc, updateDoc } from "firebase/firestore";
import { useCallback } from "react";
import { CommentItem, Photo } from "types/Photo";
import { UserFullData } from "types/UserFullDataType";
import { useUserData } from "./useUserData";
import { Post } from "types/Post";





export const useContentComments = () => {
    const { userData : {userId:myId, userFullname, userAvatar, photos:myPhotos, posts:myPosts}} = useUserData()
    const { userData } = useUserData()



    const sendCommentPost = useCallback((currentPost:Post, allPosts:Post[], ref: DocumentReference<DocumentData, DocumentData>, newComment:CommentItem) => {
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
            updateDoc(ref, {
                posts: updatedContentArray,
            })
        }
    }, [])


    const sendCommentPhoto = useCallback((currentPhoto:Photo, allPhotos:Photo[], ref: DocumentReference<DocumentData, DocumentData>, newComment:CommentItem) => {
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

            updateDoc(ref, {
                photos: updatedContentArray,
            })
        }
    }, [])



    const saveContentComment = useCallback((newCommentText:string, contentItem:Post | Photo, user:UserFullData) => {
        const { userId, posts:userPosts, photos:userPhotos } = user;

        const newComment:CommentItem = {
            userId,
            userName: userFullname,
            userAvatar,
            text: newCommentText,
            date: Date.now(),
        }

        const myRef = doc(db, "users", myId);
        const userRef = doc(db, "users", userId);


        if ('postId' in contentItem) {
            if (userId === myId) {
                sendCommentPost(contentItem, myPosts, myRef, newComment)
                return
            }
            sendCommentPost(contentItem, userPosts, userRef, newComment)
        } else if ('photoId' in contentItem) {
            console.log(myPhotos);
            
            if (userId === myId) {
                sendCommentPhoto(contentItem, myPhotos as Photo[], myRef, newComment)
                return
            }
            sendCommentPhoto(contentItem, userPhotos as Photo[], userRef, newComment)
        }

    }, [myPosts, myPhotos, userData])


    return {
        saveContentComment
    }
}
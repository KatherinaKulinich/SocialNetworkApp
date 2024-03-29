import { db } from "firebase";
import { DocumentData, DocumentReference, doc, updateDoc } from "firebase/firestore";
import { useCallback } from "react";
import { Photo } from "types/Photo";
import { Post } from "types/Post";
import { useAppSelector } from "../hooks";
import { CommentItem } from "types/Comment";
import { UserProfile } from "types/UserProfile";






export const useContentComments = (contentOwner:UserProfile) => {
    const myData = useAppSelector(state => state.userData.user);

    const { userId:myId, userFullname } = myData?.personalData ?? {};
    const { userAvatar } = myData?.profileData ?? {};
    const { photos:myPhotos, posts:myPosts } = myData.content;
    
    const { posts:userPosts, photos:userPhotos } = contentOwner?.content ?? {};
    const { userId } = contentOwner?.personalData ?? {};

    const myRef = doc(db, "users", myId);
    const userRef = doc(db, "users", userId);

  


    
    const createCommentPost = async (currentPost:Post, allPosts:Post[], ref: DocumentReference<DocumentData, DocumentData>, newComment:CommentItem) => {
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
                "content.posts": updatedContentArray,
            })
        }
    }


    const createCommentPhoto = async (currentPhoto:Photo, allPhotos:Photo[], ref: DocumentReference<DocumentData, DocumentData>, newComment:CommentItem) => {
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
                "content.photos": updatedContentArray,
            })
        }
    }



    const saveContentComment = useCallback((newCommentText:string, contentItem:Post | Photo) => {
        const newComment:CommentItem = {
            userId: myId,
            userName: userFullname,
            userAvatar,
            text: newCommentText,
            date: Date.now(),
        }

        if ('postId' in contentItem) {
            if (userId === myId) {
                createCommentPost(contentItem, myPosts, myRef, newComment)
                return
            }
            createCommentPost(contentItem, userPosts, userRef, newComment)
        } else if ('photoId' in contentItem) {
            if (userId === myId) {
                createCommentPhoto(contentItem, myPhotos as Photo[], myRef, newComment)
                return
            }
            createCommentPhoto(contentItem, userPhotos as Photo[], userRef, newComment)
        }
    }, [myPosts, myPhotos, userPhotos, userPosts, myId, userId])


    return {
        saveContentComment
    }
}
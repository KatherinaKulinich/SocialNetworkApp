import { useCallback } from "react"
// import { useUserData } from "./useUserData";
import { Post, Reaction } from "types/Post";
import { UserFullData } from "types/UserFullDataType";
import { db } from "firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useAppDispatch, useAppSelector } from "./hooks";
import { useCheckMyContentReaction } from "./useCheckMyContentReaction";
import { fetchUserFullData } from "rdx/slices/userDataSlice";
import { fetchSelectedUserData } from "rdx/slices/usersSlice";






export const usePostsReactions = () => {
    const dispatch = useAppDispatch()
    const userData = useAppSelector(state => state.userData.user)
    const { userId:myId, posts:myPosts } = userData;
    const myRef = doc(db, "users", myId);

    const { checkMyPostReaction } = useCheckMyContentReaction(userData)
    



    const addReaction = useCallback(async(selectedPost:Post, user:UserFullData, reactionValue:string) => {
        const {userId, posts:userPosts} = user;
        const userRef = doc(db, "users", userId);
        const currentReaction = checkMyPostReaction(selectedPost)

        if (currentReaction === reactionValue) return;

        const currentReactionsArray:Reaction[] = selectedPost?.postReactions;
        const newPostReactionsArray:Reaction[] = currentReactionsArray.map((item:Reaction) => {
            if (item.value === reactionValue) {
                const newReactions = [...item.usersReactions, myId]
                return {...item, usersReactions: newReactions }
            }
            
            const filteredReactions = item.usersReactions.filter(id => id !== myId)
            return {...item, usersReactions: filteredReactions}
        })

        const updatedPost = {...selectedPost, postReactions: newPostReactionsArray}

        if (myId === userId) {
            const updatedPostsArray = myPosts?.map((item:Post) => {
                if (item.postId === updatedPost.postId) {
                    return updatedPost
                }
                return item
            })
            await updateDoc(myRef, {
                posts: updatedPostsArray,
            })
        } else {
            const updatedPostsArray = userPosts?.map((item:Post) => {
                if (item.postId === updatedPost.postId) {
                    return updatedPost
                }
                return item
            })
            await updateDoc(userRef, {
                posts: updatedPostsArray,
            })
        }
        myId && dispatch(fetchUserFullData(myId))
        userId &&  dispatch(fetchSelectedUserData(userId))

    },[myPosts])

    
    return {
        addReaction
    }
}
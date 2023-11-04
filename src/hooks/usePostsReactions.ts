import { useCallback } from "react"
import { useUserData } from "./useUserData";
import { Post, Reaction } from "types/Post";
import { UserFullData } from "types/UserFullDataType";
import { db } from "firebase";
import { doc, updateDoc } from "firebase/firestore";






export const usePostsReactions = () => {

    const { userData } = useUserData()
    const { userId:myId, posts:myPosts } = userData;
    const myRef = doc(db, "users", myId);
    

    const checkMyReaction = useCallback((post:Post):string | false => {
        const reactions = post?.postReactions;

        for (let i = 0; i < reactions.length; i++) {
            if (reactions[i].usersReactions.includes(myId)) {
                return reactions[i].value
            }
        }
        return false
    }, [userData])


    const addReaction = useCallback((selectedPost:Post, user:UserFullData, reactionValue:string) => {
        const {userId, posts:userPosts} = user;
        const userRef = doc(db, "users", userId);
        const currentReaction = checkMyReaction(selectedPost)

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
            updateDoc(myRef, {
                posts: updatedPostsArray,
            })
            return
        } 
        const updatedPostsArray = userPosts?.map((item:Post) => {
            if (item.postId === updatedPost.postId) {
                return updatedPost
            }
            return item
        })
        updateDoc(userRef, {
            posts: updatedPostsArray,
        })

    },[userData])

    
    return {
        checkMyReaction,
        addReaction
    }
}
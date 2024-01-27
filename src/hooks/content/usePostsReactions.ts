import { useCallback } from "react"
import { Post, Reaction } from "types/Post";
import { db } from "firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useCheckMyContentReaction } from "./useCheckMyContentReaction";
import { fetchUserFullData } from "rdx/slices/userDataSlice";
import { fetchSelectedUserData } from "rdx/slices/usersSlice";
import { UserProfile } from "types/UserProfile";
import { fetchFriends } from "rdx/slices/friendsSlice";
import { fetchRandomUsers } from "rdx/slices/randomUsersSlice";






export const usePostsReactions = () => {
    const dispatch = useAppDispatch()

    const userData = useAppSelector(state => state.userData.user)
    const { personalData, content } = userData;
    const { userId:myId } = personalData;
    const { posts:myPosts } = content;
    const { friends, followers } = userData?.contacts ?? {}
    const friendsIds = friends?.map(friend => friend.id) || []
    const { userCity, userCountry } = userData?.profileData ?? {}

    const { checkMyPostReaction } = useCheckMyContentReaction(userData)
    const myRef = doc(db, "users", myId);


    const refreshUsersData = useCallback((myId:string, userId: string) => {
        if (myId && userId) {
            dispatch(fetchUserFullData(myId))
            dispatch(fetchSelectedUserData(userId))
            dispatch(fetchFriends(friendsIds, 'friends'))
            dispatch(fetchFriends(followers, 'followers'))
            dispatch(fetchRandomUsers(userCountry, userCity, myId))
        }
    }, [])
    



    const addReaction = useCallback(async(selectedPost:Post, user:UserProfile, reactionValue:string) => {
        const { personalData, content } = user;
        const { userId } = personalData;
        const { posts:userPosts } = content;

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
                "content.posts": updatedPostsArray,
            })
        } else {
            const updatedPostsArray = userPosts?.map((item:Post) => {
                if (item.postId === updatedPost.postId) {
                    return updatedPost
                }
                return item
            })
            await updateDoc(userRef, {
                "content.posts": updatedPostsArray,
            })
        }
        refreshUsersData(myId, userId)
    },[myPosts])

    
    return {
        addReaction
    }
}
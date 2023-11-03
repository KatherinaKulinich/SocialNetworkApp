import { useCallback } from "react"
import { useUserData } from "./useUserData";
import { Post } from "types/Post";




export const usePostsReactions = () => {

    const { userData } = useUserData()
    const { userId, userName, photos } = userData;
    

    const checkMyReaction = useCallback((post:Post) => {
        const reactions = post?.postReactions;

        reactions.forEach((reaction) => {
            if (reaction.usersReactions.includes(userId)) {
                return reaction.value
            }
            return false
        })
    }, [userData])


    const addReaction

    
    return {
        checkMyReaction,
    }
}
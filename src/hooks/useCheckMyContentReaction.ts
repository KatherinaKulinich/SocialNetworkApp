import { useCallback } from "react";
import { Photo } from "types/Photo";
import { Post } from "types/Post";
import { UserFullData } from "types/UserFullDataType"





export const useCheckMyContentReaction = (myUserData:UserFullData) => {
    const { userId:myId } = myUserData;


    const checkMyPhotoLike = useCallback((photo:Photo) => {
        if (photo?.photoLikes?.includes(myId)) {
            return true
        }
        return false
    }, [myId])


    const checkMyPostReaction = useCallback((post:Post):string | false => {
        const reactions = post?.postReactions;

        for (let i = 0; i < reactions.length; i++) {
            if (reactions[i].usersReactions.includes(myId)) {
                return reactions[i].value
            }
        }
        return false
    }, [myId])


    return {
        checkMyPhotoLike,
        checkMyPostReaction
    }
}
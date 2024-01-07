import { message } from "antd";
import { db } from "firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useCallback } from "react";
import { UserProfile } from "types/UserProfile";
import { useAppSelector } from "../hooks";





export const useChatSettings = () => {
    const userData:UserProfile  = useAppSelector(state => state.userData.user);
    const { userId } = userData.personalData
    const userRef = doc(db, "users", userId);


    const updateChatBackground = useCallback( async (bg: string) => {
        await message.loading('Updating chat background...');

        if (userId) {
            await updateDoc(userRef, {
                "additionalData.chatBackground": bg,
            })
            await message.success('Background for chats has been changed!')
        }
    }, [userData])


    return {
        updateChatBackground
    }
}
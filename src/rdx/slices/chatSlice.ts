import { AnyAction, PayloadAction, ThunkDispatch, createSlice } from "@reduxjs/toolkit";
import { RootState } from "rdx/store";
import { ChatMessageItem } from "types/ChatMessage";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "firebase";



interface ChatState {
    chat: Array<ChatMessageItem>,
    error: string | null,
    userIsTyping:boolean;
}

const initialState: ChatState = {
    chat: [] as Array<ChatMessageItem>,
    error: null,
    userIsTyping: false,
}


const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        getChatData(state, action: PayloadAction<Array<ChatMessageItem>>) {
            state.chat = action.payload
        },
        getErrorMessage(state, action: PayloadAction<string>) {
            state.error = action.payload
        },
        getUserInputFocus(state, action:  PayloadAction<boolean>) {
            state.userIsTyping = action.payload
        }
    }
})


export const fetchChatData = (chatId: string) => {
    return async (dispatch:ThunkDispatch< RootState, unknown, AnyAction>, getState:() => RootState) => {
        try {
            const docRef = doc(db, "chats", chatId)
    
            onSnapshot(docRef, (doc) => {
                if (doc.exists()) {
                    dispatch(getChatData(doc.data().messages as Array<ChatMessageItem>))
                }
            })
        } catch (error: unknown) {
            if (error instanceof Error) {
                dispatch(getErrorMessage(error.message))
                return
            }
            dispatch(getErrorMessage(String(error)))
        }
    }
}


export const fetchInputFocusData = (chatId: string, userId: string) => {
    return async (dispatch:ThunkDispatch< RootState, unknown, AnyAction>, getState:() => RootState) => {
        try {
            const docRef = doc(db, "chats", chatId)
            onSnapshot(docRef, (doc) => {
                if (doc.exists()) {
                    console.log(doc.data().userIsTyping[userId]);
                    
                    dispatch(getUserInputFocus(doc.data().userIsTyping[userId]))
                }
            })
        } catch (error: unknown) {
            if (error instanceof Error) {
                dispatch(getErrorMessage(error.message))
                return
            }
            dispatch(getErrorMessage(String(error)))
        }
    }
}






export const { 
    getChatData, 
    getErrorMessage,
    getUserInputFocus
} = chatSlice.actions;

export default chatSlice.reducer;
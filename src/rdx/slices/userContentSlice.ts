import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Photo } from "types/Photo";
import { Post } from "types/Post";

interface ContentState {
    selectedPhoto: Photo,
    selectedPost: Post,
}

const initialState: ContentState = {
    selectedPhoto: {} as Photo,
    selectedPost: {} as Post,
}



const userContentSlice = createSlice({
    name: 'content',
    initialState,
    reducers: {
        getSelectedUserPhoto(state, action: PayloadAction<Photo>) {
            state.selectedPhoto = action.payload
        },
        getSelectedUserPost(state, action: PayloadAction<any>) {
            state.selectedPost = action.payload
        }
    }
})


export const { getSelectedUserPhoto, getSelectedUserPost  } = userContentSlice.actions;

export default userContentSlice.reducer;
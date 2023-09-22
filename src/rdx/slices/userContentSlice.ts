import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Photo } from "types/Photo";

interface ContentState {
    selectedPhoto: Photo,
}

const initialState: ContentState = {
    selectedPhoto: {} as Photo,
}


const userContentSlice = createSlice({
    name: 'content',
    initialState,
    reducers: {
        getSelectedUserPhoto(state, action: PayloadAction<Photo>) {
            state.selectedPhoto = action.payload
        },
       
        // getErrorMessage(state, action: PayloadAction<any>) {
        //     state.error = action.payload;
        // },
    }
})


export const { getSelectedUserPhoto  } = userContentSlice.actions;

export default userContentSlice.reducer;
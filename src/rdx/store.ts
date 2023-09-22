import { configureStore } from "@reduxjs/toolkit";
import userAuthSlice from "./slices/userAuthSlice";
import userDataSlice from "./slices/userDataSlice";
import usersSlice from "./slices/usersSlice";
import friendsSlice from "./slices/friendsSlice";
import userContentSlice from "./slices/userContentSlice";


const store = configureStore({
    reducer: {
        userAuth: userAuthSlice,
        userData: userDataSlice,
        users: usersSlice,
        friends: friendsSlice,
        content: userContentSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
        serializableCheck: false,
        }),
});


export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
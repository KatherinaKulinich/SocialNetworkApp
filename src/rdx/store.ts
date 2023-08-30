import { configureStore } from "@reduxjs/toolkit";
import userAuthSlice from "./slices/userAuthSlice";
import userDataSlice from "./slices/userDataSlice";
import usersSlice from "./slices/usersSlice";


const store = configureStore({
    reducer: {
        userAuth: userAuthSlice,
        userData: userDataSlice,
        users: usersSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
        serializableCheck: false,
        }),
});


export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
import { Route, Routes } from "react-router-dom"
import { IntroPage } from "./pages/IntroPage/IntroPage"
import { Page404Error } from "./pages/Page404Error/Page404Error"
import { SecondaryLayout } from "./components/layout/SecondaryLayout/SecondaryLayout"
import { MainLayout } from "./components/layout/MainLayout/MainLayout"
import { LoginPage } from "./pages/LoginPage"
import { SettingsPage } from "./pages/SettingsPage"
import { MyProfilePage } from "./pages/MyProfilePage"
import { SearchPage } from "./pages/SearchPage"
import { MyChatsPage } from "./pages/MyChatsPage"
import { MyFriendsPage } from "./pages/MyFriendsPage"
import { MyPhotosPage } from "./pages/MyPhotosPage"
import { BirthDaysAlertsPage } from "./pages/BirthdaysAlertsPage"
import { ProfileCreatingPage } from "./pages/ProfileCreatingPage"
import { ChatPage } from "./pages/ChatPage/ChatPage"
import { FriendProfilePage } from "./pages/FriendProfilePage"
import { FriendsPhotosPage } from "./pages/FriendPhotosPage"
import { RequireAuth } from "hoc/RequireAuth"


export const App:React.FC = () => {
    return (
        <>
            <Routes>
                <Route 
                    path="/" 
                    element={<SecondaryLayout/>}
                >
                    <Route element={<IntroPage/>} index/>
                    <Route path="login" element={<LoginPage/>}/>
                    <Route path="profileCreating" element={
                        <RequireAuth>
                            <ProfileCreatingPage/>
                        </RequireAuth>
                    }/>
                </Route>
                <Route 
                    path="/" 
                    element={<MainLayout/>}
                >
                    <Route path="myProfile" element={
                        <RequireAuth>
                            <MyProfilePage/>
                        </RequireAuth>
                    }/>
                    <Route path="myPhotos" element={
                        <RequireAuth>
                            <MyPhotosPage/>
                        </RequireAuth>
                    }/>
                    <Route path="myFriends" element={
                        <RequireAuth>
                            <MyFriendsPage/>
                        </RequireAuth>
                    }/>
                    <Route path="myFriends/profile" element={
                        <RequireAuth>
                            <FriendProfilePage/>
                        </RequireAuth>
                    }/>
                    <Route path="myFriends/photos" element={
                        <RequireAuth>
                            <FriendsPhotosPage/>
                        </RequireAuth>
                    }/>
                    <Route path="myChats" element={
                        <RequireAuth>
                            <MyChatsPage/>
                        </RequireAuth>
                    }/>
                    <Route path="myChats/chat" element={
                        <RequireAuth>
                            <ChatPage/>
                        </RequireAuth>
                    }/>
                    <Route path="settings" element={
                        <RequireAuth>
                            <SettingsPage/>
                        </RequireAuth>
                    }/>
                    <Route path="search" element={
                        <RequireAuth>
                            <SearchPage/>
                        </RequireAuth>
                    }/>
                    <Route path="birthdays" element={
                        <RequireAuth>
                            <BirthDaysAlertsPage/>
                        </RequireAuth>
                    }/>
                </Route>
                <Route element={<SecondaryLayout/>}>
                    <Route path="*" element={<Page404Error/>}/>
                </Route>
            </Routes>
        </>
    )
}


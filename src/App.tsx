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
                    <Route path="profileCreating" element={<ProfileCreatingPage/>}/>
                </Route>
                <Route 
                    path="/" 
                    element={<MainLayout/>}
                >
                    <Route path="myProfile" element={<MyProfilePage/>}/>
                    <Route path="myPhotos" element={<MyPhotosPage/>}/>
                    <Route path="myFriends" element={<MyFriendsPage/>}/>
                    <Route path="myFriends/profile" element={<FriendProfilePage/>}/>
                    <Route path="myFriends/photos" element={<FriendsPhotosPage/>}/>
                    <Route path="myChats" element={<MyChatsPage/>}/>
                    <Route path="myChats/chat" element={<ChatPage/>}/>
                    <Route path="settings" element={<SettingsPage/>}/>
                    <Route path="search" element={<SearchPage/>}/>
                    <Route path="birthdays" element={<BirthDaysAlertsPage/>}/>
                </Route>
                <Route 
                    element={<SecondaryLayout/>}
                >
                    <Route path="*" element={<Page404Error/>}/>
                </Route>
            </Routes>
        </>
    )
}


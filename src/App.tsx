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
import { MyPhotosPage } from "./pages/MyPhotosPage"
import { BirthDaysAlertsPage } from "./pages/BirthdaysAlertsPage"
import { ProfileCreatingPage } from "./pages/ProfileCreatingPage"
import { ChatPage } from "./pages/ChatPage/ChatPage"
import { UserProfilePage } from "./pages/UserProfilePage"
import { UserPhotosPage } from "pages/UserPhotosPage"
import { UserFriendsPage } from "pages/UserFriendsPage"
import { RequireAuth } from "hoc/RequireAuth"
import { MyFeedPage } from "pages/MyFeedPage"
import { MyPostsPage } from "pages/MyPostsPage"
import { MyFriendsAndFollowersPage } from "pages/MyFriendsAndFollowersPage"
import { MyRequestsAndFollowingPage } from "pages/MyRequestsAndFollowingPage"
import { InterestingPage } from "pages/InterestingPage"





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
                    <Route path="myFeed" element={
                        <RequireAuth>
                            <MyFeedPage/>
                        </RequireAuth>
                    }/>
                    <Route path="interesting" element={
                        <RequireAuth>
                            <InterestingPage/>
                        </RequireAuth>
                    }/>
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
                    <Route path="myPosts" element={
                        <RequireAuth>
                            <MyPostsPage/>
                        </RequireAuth>
                    }/>
                    <Route path="myFriendsAndFollowers" element={
                        <RequireAuth>
                            <MyFriendsAndFollowersPage/>
                        </RequireAuth>
                    }/>
                    <Route path="myFollowingAndRequests" element={
                        <RequireAuth>
                            <MyRequestsAndFollowingPage/>
                        </RequireAuth>
                    }/>
                    <Route path="users/:userName/profile" element={
                        <RequireAuth>
                            <UserProfilePage/>
                        </RequireAuth>
                    }/>
                    <Route path="users/:userName/photos" element={
                        <RequireAuth>
                            <UserPhotosPage/>
                        </RequireAuth>
                    }/>
                    <Route path="users/:userName/friends" element={
                       <RequireAuth>
                            <UserFriendsPage/>
                        </RequireAuth>
                    }/>
                    {/* {["friends/:userName/friends","users/:userName/friends" ].map((path, index) => (
                        <Route key={index} path={path} element={
                            <RequireAuth>
                                <UserFriendsPage/>
                            </RequireAuth>
                        } />
                    ))} */}
                    <Route path="myChats" element={
                        <RequireAuth>
                            <MyChatsPage/>
                        </RequireAuth>
                    }/>
                    <Route path="myChats/:userName/chat" element={
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


import { BsFillChatDotsFill } from 'react-icons/Bs';
import { FaGift, FaUsers,  FaUserClock, FaEye, FaUserPlus, FaUserCircle, FaListUl } from 'react-icons/Fa';
import { IoMdImages, IoMdSettings } from 'react-icons/Io';
import { PiBookOpenTextFill } from 'react-icons/Pi';
import { TbHeartSearch } from "react-icons/tb";



export const navItems = [
    {
        label: 'Users search',
        value: 'search',
        icon: FaUserPlus,   
    },
    {
        label: 'My feed',
        value: 'myFeed',
        icon: FaListUl,  
    },
    {
        label: 'Interesting',
        value: 'interesting',
        icon: TbHeartSearch,  
    },
    {
        label: 'My profile',
        value: 'myProfile',
        icon: FaUserCircle,  
    },
    {
        label: 'Friends and followers',
        value: 'myFriendsAndFollowers',
        icon: FaUsers,  
    },
    // {
    //     label: 'following and requests',
    //     value: 'myFollowingList',
    //     icon: FaEye,  
    // },
    {
        label: 'following and requests',
        value: 'myFollowingAndRequests',
        icon: FaUserClock ,  
    },
    {
        label: 'My chats',
        value: 'myChats',
        icon: BsFillChatDotsFill,  
    },
    {
        label: 'My photos',
        value: 'myPhotos',
        icon: IoMdImages,  
    },
    {
        label: 'My posts',
        value: 'myPosts',
        icon: PiBookOpenTextFill,  
    },
    {
        label: 'Birthday alerts',
        value: 'birthdays',
        icon: FaGift,  
    },
    {
        label: 'Settings',
        value: 'settings',
        icon: IoMdSettings,  
    },
]


export const navMobItems = ['myFeed', 'myProfile', 'myChats', 'myPhotos', 'myPosts'];



import { BsFillChatDotsFill } from 'react-icons/Bs';
import { FaGift, FaUsers,  FaUserClock, FaEye, FaUserPlus, FaUserCircle, FaListUl } from 'react-icons/Fa';
import { IoMdImages, IoMdSettings } from 'react-icons/Io';
import { PiBookOpenTextFill } from 'react-icons/Pi';

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
        label: 'My profile',
        value: 'myProfile',
        icon: FaUserCircle,  
    },
    {
        label: 'my Friends',
        value: 'myFriends',
        icon: FaUsers,  
    },
    {
        label: 'my Following List',
        value: 'myFollowingList',
        icon: FaEye,  
    },
    {
        label: 'my Friend Requests',
        value: 'myFriendRequests',
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
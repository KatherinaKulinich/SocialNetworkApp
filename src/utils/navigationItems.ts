
import { BsFillChatDotsFill } from 'react-icons/Bs';
import { FaGift, FaUsers } from 'react-icons/Fa';
import { IoMdImages, IoMdSettings } from 'react-icons/Io';
import { RiUserFill, RiUserSearchFill } from 'react-icons/Ri';

export const navItems = [
    {
        label: 'Users search',
        value: 'search',
        icon: RiUserSearchFill,  
    },
    {
        label: 'My profile',
        value: 'myProfile',
        icon: RiUserFill,  
    },
    {
        label: 'my Friends',
        value: 'myFriends',
        icon: FaUsers,  
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
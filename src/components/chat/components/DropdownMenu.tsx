import { Icon } from '@components/icons/Icon';
import { theme } from '@styles/Theme';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { BsThreeDots } from 'react-icons/Bs';
import { Link, useNavigate } from 'react-router-dom';
import AnchorLink from 'antd/es/anchor/AnchorLink';
import { useCallback } from 'react';


interface DropdownMenuProps {
    deleteChat: () => void,
    openDrawerMedia: () => void,
    openDrawerSettings: () => void,
}


export const DropdownMenu:React.FC<DropdownMenuProps> = ({deleteChat, openDrawerMedia, openDrawerSettings}) => {
    const navigate = useNavigate();

    // const navigateToChatSettings = useCallback(() => {
    //     navigate("/settings");
    //     setTimeout(() => {
    //         const contactSection = document.getElementById("chat-background");
    //             if (contactSection) {
    //                 contactSection.scrollIntoView({ behavior: "smooth" });
    //             }
    //     }, 100);
    // }, [])


    const items: MenuProps['items'] = [
        {
            label: 'media files',
            key: '1',
            onClick: openDrawerMedia,
        },
        {
            label: 'chat settings',
            key: '0',
            onClick: openDrawerSettings, 
        },
        // {
        //     label: 'chat settings',
        //     key: '1',
        //     onClick: navigateToChatSettings,
        // },
        {
            type: 'divider',
        },
        {
            label: 'delete chat',
            key: '3',
            danger: true,
            onClick: deleteChat, 
        },
    ];


    return (
        <Dropdown 
            menu={{ items }} 
            trigger={['click']}  
            placement="bottomRight"
        >
            <a onClick={(e) => e.preventDefault()}>
                <Space>
                    <Icon 
                        icon={<BsThreeDots/>} 
                        iconSize={'30px'}
                        iconColor={theme.colors.mediumGray}
                    />
                </Space>
            </a>
        </Dropdown>
    )
}
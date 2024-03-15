import { Icon } from '@components/icons/Icon';
import { theme } from '@styles/Theme';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { BsThreeDotsVertical } from 'react-icons/Bs';
import { Link, useNavigate } from 'react-router-dom';
import AnchorLink from 'antd/es/anchor/AnchorLink';
import { useCallback } from 'react';





export const DropdownMenu:React.FC = () => {
    const navigate = useNavigate();

    const navigateToChatSettings = useCallback(() => {
        navigate("/settings");
        setTimeout(() => {
            const contactSection = document.getElementById("chat-background");
                if (contactSection) {
                    contactSection.scrollIntoView({ behavior: "smooth" });
                }
        }, 100);
    }, [])

    
    const items: MenuProps['items'] = [
        {
            label: 'media files',
            key: '0',
            onClick: () => {console.log("open drawer")}, 
        },
        {
            label: 'chat settings',
            key: '1',
            onClick: navigateToChatSettings,
        },
        {
            type: 'divider',
        },
        {
            label: 'delete chat',
            key: '3',
            danger: true,
            onClick: () => {console.log("delete chat")}, 
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
                        icon={<BsThreeDotsVertical/>} 
                        iconSize={'20px'}
                        iconColor={theme.colors.mediumGray}
                    />
                </Space>
            </a>
        </Dropdown>
    )
}
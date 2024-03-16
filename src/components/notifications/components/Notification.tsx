import { Icon } from "@components/icons/Icon";
import { theme } from "@styles/Theme";
import { notification } from "antd";
import { NotificationPlacement } from "antd/es/notification/interface";
import { useEffect } from "react";
import { GiGlassCelebration } from "react-icons/gi";

interface NotificationProps{
    title: string;
    text: string;
    icon: React.ReactNode;
    place: NotificationPlacement ;
}

export const Notification:React.FC<NotificationProps> = ({text, title, icon, place}) => {
    const [api, contextHolder] = notification.useNotification();

    const openNotification = () => {
        api.open({
            message: title,
            description: text,
            icon: <Icon 
                icon={icon} 
                iconSize={'30px'} 
                iconColor={theme.colors.regular}
            />,
            duration: 8,
            placement: place,
        });
    };

    useEffect(() => {
        openNotification()
    }, [])
    
    return contextHolder
}
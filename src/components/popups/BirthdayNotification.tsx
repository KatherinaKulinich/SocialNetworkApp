import { Icon } from "@components/icons/Icon";
import { theme } from "@styles/Theme";
import { notification } from "antd";
import { useEffect } from "react";
import { GiGlassCelebration } from "react-icons/gi";

interface BirthdayNotificationProps{
    text: string;
}

export const BirthdayNotification:React.FC<BirthdayNotificationProps> = ({text}) => {
    const [api, contextHolder] = notification.useNotification();

    const openNotification = () => {
        api.open({
            message: 'Birthday',
            description: text,
            icon: <Icon 
                icon={<GiGlassCelebration />} 
                iconSize={'30px'} 
                iconColor={theme.colors.regular}
            />,
            duration: 8,
        });
    };

    useEffect(() => {
        openNotification()
    }, [])
    
    return contextHolder
}
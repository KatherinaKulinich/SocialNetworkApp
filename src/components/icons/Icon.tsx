import { IconContext } from "react-icons";


interface IconProps {
    icon: React.ReactNode;
    iconColor: string;
    iconSize: string;
}

export const Icon: React.FC<IconProps> = ({icon, iconColor, iconSize}) => {
    return (
        <IconContext.Provider value={{ color: iconColor , size: iconSize}}>
            {icon}
        </IconContext.Provider>
    )
}
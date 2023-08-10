import { Icon } from "@components/icons/Icon";
import { Button } from "./IconButton.styled";

interface IconButtonProps {
    icon: React.ReactNode;
    color: string;
    size: string;
    type: 'button' | 'submit';
    onClickHandler?: () => void;
}

export const IconButton:React.FC<IconButtonProps> = (
    {icon, color, size, onClickHandler, type}) => {

    return (
        <Button 
            type={type} 
            onClick={onClickHandler}
        >
            <Icon 
                icon={icon} 
                iconColor={color} 
                iconSize={size}
            />
        </Button>
    )
}
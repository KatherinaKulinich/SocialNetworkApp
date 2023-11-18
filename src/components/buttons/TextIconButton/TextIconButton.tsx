import { IconType } from "react-icons";
import { Icon } from "../../icons/Icon"
import { Button } from "./TextIconButton.styled"
import { theme } from "@styles/Theme";


interface TextIconButtonProps {
    text: string;
    icon: React.ReactNode;
    color: string;
    textSize: string;
    iconSize: string;
    buttonType: 'button' |'submit';
    onClickHandler?: () => void;
    fontWeight: number;
    isDisabled?: boolean;
}

export const TextIconButton:React.FC<TextIconButtonProps> = (
    {text, icon, color, textSize, iconSize, buttonType, onClickHandler, fontWeight, isDisabled}) => {

    const iconColor = isDisabled ? theme.colors.mediumGray : color

    return (
        <Button 
            textSize={textSize} 
            color={color} 
            type={buttonType} 
            onClick={onClickHandler}
            fontWeight={fontWeight}
            isDisabled={isDisabled}
        >
            <Icon 
                icon={icon} 
                iconColor={iconColor} 
                iconSize={iconSize}
            />
            {text}
        </Button>
    )
}
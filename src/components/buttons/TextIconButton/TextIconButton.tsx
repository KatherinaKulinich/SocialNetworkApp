import { Icon } from "../../icons/Icon"
import { Button } from "./TextIconButton.styled"


interface TextIconButtonProps {
    text: string;
    icon: React.ReactNode;
    color: string;
    textSize: number;
    iconSize: string;
    buttonType: 'button' |'submit';
    onClickHandler?: () => void;
    fontWeight: number;
}

export const TextIconButton:React.FC<TextIconButtonProps> = (
    {text, icon, color, textSize, iconSize, buttonType, onClickHandler, fontWeight}) => {

    return (
        <Button 
            textSize={textSize} 
            color={color} 
            type={buttonType} 
            onClick={onClickHandler}
            fontWeight={fontWeight}
        >
            <Icon 
                icon={icon} 
                iconColor={color} 
                iconSize={iconSize}
            />
            {text}
        </Button>
    )
}
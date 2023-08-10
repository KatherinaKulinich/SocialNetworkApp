import { Button } from "./SecondaryButton.styled";


interface SecondaryButtonProps {
    buttonText: string;
    buttonColor: string;
    type: 'submit' | 'button';
    onClickHandler?: () => void;
    icon?: React.ReactNode;
}



export const SecondaryButton:React.FC<SecondaryButtonProps> = (
    {buttonText, buttonColor, type, onClickHandler, icon}) => {

    return (
        <Button 
            type={type} 
            onClick={onClickHandler} 
            color={buttonColor}
        >
            {buttonText} {icon}
        </Button>
    )
}
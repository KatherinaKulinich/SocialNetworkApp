import { Button } from "./RegularButton.styled"



interface RegularButtonProps {
    buttonType: 'submit' | 'button',
    buttonText: string,
    onClickHandler?: React.MouseEventHandler<HTMLButtonElement> 
}



export const RegularButton:React.FC<RegularButtonProps> = (
    {buttonType, buttonText, onClickHandler}) => {
        
    return (
        <Button 
            type={buttonType} 
            onClick={onClickHandler}
        >
            {buttonText}
        </Button>
    )
}
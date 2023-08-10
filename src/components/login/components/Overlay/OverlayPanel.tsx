import { SecondaryButton } from "@components/buttons/SecondaryButton/SecondaryButton";
import { ImageBox, Image, Text } from "./Overlay.styled";


interface OverlayPanelProps {
    text: 'Do you have an account?' | "Don't have an account?";
    buttonText: 'Log in' | 'Sign up';
    onToogleOverlay: () => void;
    isLogin: boolean;
    imagePath: string;
    imageAlt: 'login illustration' | 'sign up illustration';
}



export const OverlayOnePanel:React.FC<OverlayPanelProps> = (
    {text, buttonText, onToogleOverlay, isLogin, imagePath, imageAlt}) => {

    return (
        <>
            <Text>
                {text}
            </Text>
            <SecondaryButton 
                buttonColor="#FFFFFF" 
                buttonText={buttonText} 
                type="button" 
                onClickHandler={onToogleOverlay}
            />
            <ImageBox $login={isLogin}>
                <Image 
                    src={imagePath} 
                    alt={imageAlt}
                    $login={isLogin}
                />
            </ImageBox> 
        </>
    )
}
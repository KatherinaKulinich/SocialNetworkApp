import { AvatarImage } from "./Avatar.styled"


interface AvatarProps {
    photo: string;
    border: string;
    size: string;
}

export const Avatar:React.FC<AvatarProps> = ({photo, border, size}) => {
    return (
        <AvatarImage 
            src={photo} 
            border={border} 
            size={size}
        />
    )
}
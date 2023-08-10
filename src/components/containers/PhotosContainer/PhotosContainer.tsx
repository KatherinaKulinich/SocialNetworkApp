import { Photos } from "./PhotosContainer.styled"
import { Image } from 'antd';

interface PhotosContainerProps {
    children:React.ReactNode
}


export const PhotosContainer:React.FC<PhotosContainerProps> = ({children}) => {
    return (
        <Photos>
            <Image.PreviewGroup>
                {children}
            </Image.PreviewGroup>
        </Photos>
    )
}
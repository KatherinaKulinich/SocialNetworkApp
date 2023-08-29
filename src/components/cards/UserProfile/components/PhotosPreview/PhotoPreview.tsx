import { PhotosBox, Photo } from "./PhotoPreview.styled"
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";


interface PhotoPreviewProps {
    photos: string[] | undefined;
    link: string;
}

export const PhotoPreview:React.FC<PhotoPreviewProps> = ({photos, link}) => {
    const navigate = useNavigate();

    const onGoToPage = useCallback(() => {
        navigate(`${link}`)
    },[])

    return (
        <PhotosBox onClick={onGoToPage}>
            {photos?.length && (
                photos.map((photo, index) => (
                    <Photo src={photo} key={index}/>       
                ))
            )}     
        </PhotosBox>
    )
}
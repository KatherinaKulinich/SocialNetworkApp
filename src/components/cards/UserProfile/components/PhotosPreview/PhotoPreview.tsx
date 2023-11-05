import { theme } from "@styles/Theme";
import { PhotosBox, PhotoSrc } from "./PhotoPreview.styled"
import { useCallback, useEffect, useState } from "react";
import { IoMdImages } from "react-icons/Io";
import { useNavigate } from "react-router-dom";
import { Photo } from "types/Photo";
import { PreviewContainer, PageLink } from "../../UserProfile.styled";
import { DataItem } from "../DataItem/DataItem";
import { UserFullData } from "types/UserFullDataType";
import emptyPhoto from '@images/defaultPhoto.jpg';
import { Paragraph } from "@components/text/Paragraph";


interface PhotoPreviewProps {
    link: string;
    role: 'myProfile' | 'userProfile';
    user: UserFullData;
}



export const PhotoPreview:React.FC<PhotoPreviewProps> = ({link, role, user}) => {
    const { userName, photos } = user;
    

    const navigate = useNavigate();
    
    const onGoToPage = useCallback(() => {
        navigate(`${link}`)
    },[])
    
    
    const [photosForPreview, setPhotosForPreview] = useState<string[]>([])

    const convertUserPhotos = useCallback((items: Photo[]):string[] => {
        const previewPhotos = items.map(photo => photo.photoUrl);

        if (previewPhotos.length < 9 || previewPhotos.length === 0) {
            const difference = 9 - items.length;

            for (let i = 0; i < difference; i++) {
                previewPhotos.push(emptyPhoto)
            }
            return previewPhotos;
        }
        previewPhotos.splice(9)
        return previewPhotos 
    },[])


    useEffect(() => {
        setPhotosForPreview(convertUserPhotos(photos))
    }, [photos])





    return (
        <PreviewContainer>
            <DataItem 
                icon={<IoMdImages/>} 
                itemName={role === 'userProfile' ? `${userName}'s photos` : 'My photos'} 
                direction='column'
            />
            {photos?.length > 0 ? (
                <PageLink to={link}>
                    See more...
                </PageLink>
            ) : (
                <Paragraph 
                    text="no photos yet" 
                    color={theme.colors.regular}
                />
            )}

            <PhotosBox onClick={onGoToPage}>
                {photosForPreview?.length && (
                    photosForPreview.map((photo, index) => (
                        <PhotoSrc 
                            src={photo} 
                            key={index}
                        />       
                    ))
                )}     
            </PhotosBox>
        </PreviewContainer>
    )
}
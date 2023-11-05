import { AddingPhotoCard } from "@components/cards/AddingPhotoCard/AddingPhotoCard";
import { Photos } from "./PhotosContainer.styled"
import { Image } from 'antd';
import { useState, useCallback } from "react";
import { Photo } from "types/Photo";
import { PhotoCard } from "@components/cards/PhotoCard/PhotoCard";
import { ModalAddingPhoto } from "@components/popups/ModalAddingPhoto/ModalAddingPhoto";
import { ModalComments } from "@components/popups/ModalComments/ModalComments";
import { ModalEditing } from "@components/popups/ModalEditing/ModalEditing";
import { useManageMyContent } from "hooks/useManageMyContent";
import { usePhotosLikes } from "hooks/usePhotosLikes";
import { UserFullData } from "types/UserFullDataType";
import { useAppSelector } from "hooks/hooks";

interface PhotosContainerProps {
    owner: 'me' | 'friend';
    user: UserFullData;
}


export const PhotosContainer:React.FC<PhotosContainerProps> = ({owner, user}) => {
    const { photos } = user;

    const { editMyContent } = useManageMyContent()
    const { onToggleLike } = usePhotosLikes()
    const selectedPhoto = useAppSelector(state => state.content.selectedPhoto)
    
    const [isModalEditionOpen, setIsModalEditionOpen] = useState(false)
    const onOpenModalEdition = useCallback(() => {
        setIsModalEditionOpen(true)
    }, [isModalEditionOpen])
    const onCloseModalEdition = useCallback(() => {
        setIsModalEditionOpen(false)
    }, [isModalEditionOpen])


    const [isModalAddingPhotoOpen, setIsModalAddingPhoto] = useState(false)
    const onOpenModalAdding = useCallback(() => {
        setIsModalAddingPhoto(true)
    }, [isModalAddingPhotoOpen])
    const onCloseModalAdding = useCallback(() => {
        setIsModalAddingPhoto(false)
    }, [isModalAddingPhotoOpen])
    

    const [isModalComments, setIsModalComments] = useState(false)
    const onOpenModalComments = useCallback(() => {
        setIsModalComments(true)
    }, [isModalComments])
    const onCloseModalComments = useCallback(() => {
        setIsModalComments(false)
    }, [isModalComments])


    return (
        <>
            <Photos>
                {owner === 'me' && (
                    <AddingPhotoCard onOpenModal={onOpenModalAdding}/>
                )}
                <Image.PreviewGroup>
                    {photos !== undefined && photos.length > 0 && (
                        photos?.map((item:Photo) => (
                            <PhotoCard 
                                key={item.photoId}
                                photo={item}
                                owner={owner}
                                onOpenModalForEditing={onOpenModalEdition}
                                onOpenModalWithComments={onOpenModalComments}
                                onToggleLike={(item, user) => onToggleLike(item, user)}
                            />
                        ))
                    )}
                </Image.PreviewGroup>
            </Photos>
            
            <ModalAddingPhoto 
                isModalOpen={isModalAddingPhotoOpen} 
                onCloseModal={onCloseModalAdding}
            />
            <ModalEditing 
                isModalOpen={isModalEditionOpen}
                onCloseModal={onCloseModalEdition} 
                onEditContent={editMyContent} 
                selectedObject={selectedPhoto} 
                currentValue={selectedPhoto.photoDescription}            
            />
            <ModalComments 
                isModalOpen={isModalComments} 
                onCloseModal={onCloseModalComments}
                selectedContent={selectedPhoto}
                contentOwner={user}
            />
        </>
    )
}
import img from '@images/photosPage.svg'
import noPhotoImg from '@images/noPhotos.svg';
import { PageImgTitle } from '@components/PageImgTitle/PageImgTitle'
import { AddingPhotoCard } from '@components/cards/AddingPhotoCard/AddingPhotoCard'
import { PhotoCard } from '@components/cards/PhotoCard/PhotoCard';
import { PageContainer } from '@components/containers/PageContainer/PageContainer';
import { PhotosContainer } from '@components/containers/PhotosContainer/PhotosContainer';
import { ModalEditing } from '@components/popups/ModalEditing/ModalEditing';
import { useCallback, useState } from 'react';
import { ModalAddingPhoto } from '@components/popups/ModalAddingPhoto/ModalAddingPhoto';
import { ModalComments } from '@components/popups/ModalComments/ModalComments';
import { useUserData } from 'hooks/useUserData';
import { Photo } from 'types/Photo';
import { Post } from 'types/Post';
import { useAppSelector } from 'hooks/hooks';
import { useManageMyContent } from 'hooks/useManageMyContent';
import { usePhotosLikes } from 'hooks/usePhotosLikes';




export const MyPhotosPage:React.FC = () => {
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


    const { userData } = useUserData()
    const { photos } = userData;

    const { editMyContent } = useManageMyContent()
    const { onToggleLike } = usePhotosLikes()
    const selectedPhoto = useAppSelector(state => state.content.selectedPhoto)

    


    return (
        <PageContainer>
            <PageImgTitle 
                image={img} 
                titleFirst='My'
                titleSecond='photos'
            />
            <PhotosContainer>
                <AddingPhotoCard onOpenModal={onOpenModalAdding}/>
                {photos !== undefined && photos.length > 0 && (
                    photos?.map((item:Photo) => (
                        <PhotoCard 
                            key={item.photoId}
                            photo={item}
                            owner="me"
                            onOpenModalForEditing={onOpenModalEdition}
                            onOpenModalWithComments={onOpenModalComments}
                            onToggleLike={(photo, userData) => onToggleLike(photo, userData)}
                        />
                    ))
                )}
            </PhotosContainer>
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
                contentOwner={userData}
            />
        </PageContainer>
    )
}
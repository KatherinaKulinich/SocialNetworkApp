import img from '@images/photosPage.svg'
import noPhotoImg from '@images/noPhotos.svg';
import { PageImgTitle } from '@components/PageImgTitle/PageImgTitle'
import { AddingPhotoCard } from '@components/cards/AddingPhotoCard/AddingPhotoCard'
import { PhotoCard } from '@components/cards/PhotoCard/PhotoCard';
import { PageContainer } from '@components/containers/PageContainer/PageContainer';
import { PhotosContainer } from '@components/containers/PhotosContainer/PhotosContainer';
import { ModalEditing } from '@components/popups/ModalEditing/ModalEditing';
import { useCallback, useEffect, useState } from 'react';
import { ModalAddingPhoto } from '@components/popups/ModalAddingPhoto/ModalAddingPhoto';
import { ModalComments } from '@components/popups/ModalComments/ModalComments';
import { useUserData } from 'hooks/useUserData';
import { Photo } from 'types/Photo';
import { ImageErrorMessage } from '@components/ImageErrorMessage/ImageErrorMessage';
import { usePhotos } from 'hooks/usePhotos';
import { useAppDispatch } from 'hooks/hooks';
import { useAuth } from 'hooks/useAuth';
import { fetchUserFullData } from 'rdx/slices/userDataSlice';



export const MyPhotosPage:React.FC = () => {
    // const dispatch = useAppDispatch()
    // const { userId } = useAuth()

    // useEffect(() => {
    //     if (userId !== null && userId !== undefined ) {
    //         dispatch(fetchUserFullData(userId))
    //     }
    // }, [dispatch, userId])
    
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
    
    // const onToggleModalAdding = useCallback(() => {
    //     setIsModalAddingPhoto(!isModalAddingPhotoOpen)
    // }, [isModalAddingPhotoOpen])


    const [isModalComments, setIsModalComments] = useState(false)
    const onOpenModalComments = useCallback(() => {
        setIsModalComments(true)
    }, [isModalComments])
    const onCloseModalComments = useCallback(() => {
        setIsModalComments(false)
    }, [isModalComments])


    const { userData } = useUserData()
    const { photos } = userData

    // const { onSelectPhotoToUpdate } = usePhotos()

    // const onOpenModalForEditing = useCallback((item:Photo) => {
    //     // onSelectPhotoToUpdate(item)
    //     onToggleModalEdition()
    // }, [isModalEditionOpen])
    // const [userPhotos, setUserPhotos] = useState<Photo[]>([])

    // useEffect(() => {
    //     if (photos) {
    //         setUserPhotos(photos)
    //         console.log(photos);
    //     }
    // }, [photos])
 
    


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
                            key={item.date}
                            photo={item}
                            owner="me"
                            onOpenModalForEditing={onOpenModalEdition}
                            onOpenModalWithComments={onOpenModalComments}
                        />
                    ))
                )}
            </PhotosContainer>
            <ModalEditing 
                isModalOpen={isModalEditionOpen} 
                onCloseModal={onCloseModalEdition} 
            />
            <ModalAddingPhoto 
                isModalOpen={isModalAddingPhotoOpen} 
                onCloseModal={onCloseModalAdding}
            />
            <ModalComments 
                isModalOpen={isModalComments} 
                onCloseModal={onCloseModalComments}
                role='photo'
            />
        </PageContainer>
    )
}
import { AddingPhotoCard } from "@components/cards/photosCards/AddingPhotoCard/AddingPhotoCard";
import { Photos } from "./PhotosContainer.styled"
import { Image } from 'antd';
import { useState, useCallback, useEffect } from "react";
import { Photo } from "types/Photo";
import { PhotoCard } from "@components/cards/photosCards/PhotoCard/PhotoCard";
import { ModalAddingPhoto } from "@components/popups/ModalAddingPhoto/ModalAddingPhoto";
import { ModalComments } from "@components/popups/ModalComments/ModalComments";
import { ModalEditing } from "@components/popups/ModalEditing/ModalEditing";
import { useManageMyContent } from "hooks/content/useManageMyContent";
import { usePhotosLikes } from "hooks/content/usePhotosLikes";
import { useAppSelector } from "hooks/hooks";
import { useCheckMyContentReaction } from "hooks/content/useCheckMyContentReaction";
import { UserProfile } from "types/UserProfile";

interface PhotosContainerProps {
    owner: 'me' | 'friend';
    userOwner: UserProfile;
    myUserData: UserProfile
}




export const PhotosContainer:React.FC<PhotosContainerProps> = ({owner, userOwner, myUserData}) => {
    const { photos } = userOwner.content;
    const selectedPhoto = useAppSelector(state => state.content.selectedPhoto)

    const { editMyContent } = useManageMyContent()
    const { checkMyPhotoLike } = useCheckMyContentReaction(myUserData)
    const { togglePhotoLike } = usePhotosLikes(userOwner, myUserData)
    



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
                                onToggleLike={(item) => togglePhotoLike(item)}
                                isPhotoLiked={checkMyPhotoLike(item)}
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
                contentOwner={userOwner}
            />
        </>
    )
}
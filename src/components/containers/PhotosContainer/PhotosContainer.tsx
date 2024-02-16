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
import { useAppSelector } from "hooks/hooks";
import { useCheckMyContentReaction } from "hooks/content/useCheckMyContentReaction";
import { UserProfile } from "types/UserProfile";
import { useModalForComments } from "hooks/popups/useModalForComments";
import { useModalForEditing } from "hooks/popups/useModalForEditing";

interface PhotosContainerProps {
    owner: 'me' | 'friend';
    userOwner: UserProfile;
    myUserData: UserProfile
}




export const PhotosContainer:React.FC<PhotosContainerProps> = ({owner, userOwner, myUserData}) => {
    const { photos } = userOwner.content;
    const sortedPhotos = [...photos]?.sort((a, b) => {
        return b.date - a.date
    }) 

            
    const selectedPhoto = useAppSelector(state => state.content.selectedPhoto)

    const { editMyContent } = useManageMyContent()
    const { checkMyPhotoLike } = useCheckMyContentReaction(myUserData)


    const [isModalAddingPhotoOpen, setIsModalAddingPhoto] = useState(false)
    const onOpenModalAdding = useCallback(() => {
        setIsModalAddingPhoto(true)
    }, [isModalAddingPhotoOpen])
    const onCloseModalAdding = useCallback(() => {
        setIsModalAddingPhoto(false)
    }, [isModalAddingPhotoOpen])


    const { isModalComments, onOpenModalComments, onCloseModalComments } = useModalForComments()
    const { isModalEditionOpen, onOpenModalEdition, onCloseModalEdition} = useModalForEditing()
    



    return (
        <>
            <Photos>
                {owner === 'me' && (
                    <AddingPhotoCard onOpenModal={onOpenModalAdding}/>
                )}
                <Image.PreviewGroup>
                    {sortedPhotos && sortedPhotos.length > 0 && (
                        sortedPhotos?.map((item:Photo) => (
                            <PhotoCard 
                                key={item.photoId}
                                photo={item}
                                owner={owner}
                                onOpenModalForEditing={onOpenModalEdition}
                                onOpenModalWithComments={onOpenModalComments}
                                isPhotoLiked={checkMyPhotoLike(item)}
                                photoOwner={userOwner}
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
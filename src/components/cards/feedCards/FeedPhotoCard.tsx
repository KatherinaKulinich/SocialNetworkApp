import { useState, useCallback } from "react"
import { theme } from "@styles/Theme"
import { FeedPhoto } from "types/Feed"
import { PhotoCard } from "../photosCards/PhotoCard/PhotoCard"
import { Avatar } from "@components/Avatar/Avatar"
import { ModalComments } from "@components/popups/ModalComments/ModalComments"
import { Card, CardHeader, UserDataContainer, CardUserName, CardText } from "./FeedCards.styled"
import { useMyFullData } from "hooks/useMyFullData"
import { useCheckMyContentReaction } from "hooks/content/useCheckMyContentReaction"
import { usePhotosLikes } from "hooks/content/usePhotosLikes"

interface FeedPhotoCardProps {
    feedPostItem: FeedPhoto
}

export const FeedPhotoCard:React.FC<FeedPhotoCardProps> = ({feedPostItem}) => {
    const { user, photo } = feedPostItem

    const myUserData = useMyFullData()
    const { checkMyPhotoLike } = useCheckMyContentReaction(myUserData)
    const { togglePhotoLike } = usePhotosLikes(user, myUserData)
    
    const [isModalComments, setIsModalComments] = useState(false)
    const [isModalEditionOpen, setIsModalEditionOpen] = useState(false)

    const onOpenModalComments = useCallback(() => {
        setIsModalComments(true)
    }, [isModalComments])
    const onCloseModalComments = useCallback(() => {
        setIsModalComments(false)
    }, [isModalComments])

    const onOpenModalEdition = useCallback(() => {
        setIsModalEditionOpen(true)
    }, [isModalEditionOpen])
    const onCloseModalEdition = useCallback(() => {
        setIsModalEditionOpen(false)
    }, [isModalEditionOpen])


    return (
        <>
            <Card>
                <CardHeader>
                    <UserDataContainer>
                        <Avatar 
                            photo={user?.profileData?.userAvatar} 
                            border={`1px solid ${theme.colors.regularDark}`} 
                            size={"20px"}
                        />
                        <CardUserName>
                            {user?.personalData?.userFullname}
                        </CardUserName>
                    </UserDataContainer>
                    <CardText>
                        recently added a new photo:
                    </CardText>
                </CardHeader>

                <PhotoCard 
                    photo={photo}
                    owner={'friend'}
                    onOpenModalWithComments={onOpenModalComments}
                    onToggleLike={(photo) => togglePhotoLike(photo)}
                    isPhotoLiked={checkMyPhotoLike(photo)}
                    onOpenModalForEditing={onOpenModalEdition}
                />
            </Card>

            <ModalComments 
                isModalOpen={isModalComments} 
                onCloseModal={onCloseModalComments}
                selectedContent={photo}
                contentOwner={user}
            />
        </>
    )
}
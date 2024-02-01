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
import { useAppDispatch } from "hooks/hooks"
import { fetchFriends } from "rdx/slices/friendsSlice"
import { fetchSelectedUserData } from "rdx/slices/usersSlice"
import { useNavigate } from "react-router-dom"
import { message } from "antd"
import { useModalForComments } from "hooks/popups/useModalForComments";
import { useModalForEditing } from "hooks/popups/useModalForEditing";

interface FeedPhotoCardProps {
    feedPhotoItem: FeedPhoto,
}



export const FeedPhotoCard:React.FC<FeedPhotoCardProps> = ({feedPhotoItem}) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const { user, photo } = feedPhotoItem
    const { userId, userFullname } = user.personalData
    const { friends } = user.contacts
    const ids = friends?.map(user => user.id) || []

    const myUserData = useMyFullData()
    const { checkMyPhotoLike } = useCheckMyContentReaction(myUserData)
    const { togglePhotoLike } = usePhotosLikes(user, myUserData)

    const { isModalComments, onOpenModalComments, onCloseModalComments } = useModalForComments()
    const { onOpenModalEdition } = useModalForEditing()
    



    const goToUserPage = useCallback(() => {
        message.loading('Loading the page...', 1)
        dispatch(fetchSelectedUserData(userId))
        dispatch(fetchFriends(ids, 'friends'))
        setTimeout(navigate, 1000, `/users/${userFullname}/profile`)
    }, [dispatch, navigate])


    return (
        <>
            <Card>
                <CardHeader>
                    <UserDataContainer  onClick={goToUserPage}>
                        <Avatar 
                            photo={user?.profileData?.userAvatar} 
                            border={theme.colors.regularDark} 
                            size={"40px"}
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
import { theme } from "@styles/Theme"
import { FeedPhoto } from "types/Feed"
import { PhotoCard } from "../photosCards/PhotoCard/PhotoCard"
import { Avatar } from "@components/Avatar/Avatar"
import { ModalComments } from "@components/popups/ModalComments/ModalComments"
import { Card, CardHeader, UserDataContainer, CardUserName, CardText } from "./FeedCards.styled"
import { useCheckMyContentReaction } from "hooks/content/useCheckMyContentReaction"
import { useModalForComments } from "hooks/popups/useModalForComments";
import { useModalForEditing } from "hooks/popups/useModalForEditing";
import { useNavigateToUserPage } from 'hooks/contacts/useNavigateToUserPage'
import { useAppSelector } from 'hooks/hooks';

interface FeedPhotoCardProps {
    feedPhotoItem: FeedPhoto,
    refreshData: () => void
}



export const FeedPhotoCard:React.FC<FeedPhotoCardProps> = ({feedPhotoItem, refreshData}) => {
    const { user, photo } = feedPhotoItem
    const { goToUserPage } = useNavigateToUserPage(user)

    const myUserData = useAppSelector(state => state.userData.user)
    const { checkMyPhotoLike } = useCheckMyContentReaction(myUserData)


    const { isModalComments, onOpenModalComments, onCloseModalComments } = useModalForComments()
    const { onOpenModalEdition } = useModalForEditing()
    

    return (
        <>
            <Card>
                <CardHeader>
                    <UserDataContainer  onClick={goToUserPage}>
                        <Avatar 
                            photo={user?.profileData?.userAvatar} 
                            border={theme.colors.regularDark} 
                            size={"25px"}
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
                    photoOwner={user}
                    isPhotoLiked={checkMyPhotoLike(photo)}
                    onOpenModalForEditing={onOpenModalEdition}
                    refreshData={refreshData}
                />
            </Card>

            <ModalComments 
                isModalOpen={isModalComments} 
                onCloseModal={onCloseModalComments}
                selectedContent={photo}
                contentOwner={user}
                refreshUsersData={refreshData}
            />
        </>
    )
}
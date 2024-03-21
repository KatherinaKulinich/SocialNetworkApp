import { FeedPost } from "types/Feed"
import { Card, CardHeader, CardText, CardUserName, UserDataContainer } from "./FeedCards.styled"
import { UserPostCard } from "@components/cards/postsCards/UserPostCard/UserPostCard"
import { ModalComments } from "@components/popups/ModalComments/ModalComments"
import { Avatar } from "@components/Avatar/Avatar"
import { theme } from "@styles/Theme"
import { useAppDispatch } from "hooks/hooks"
import { useNavigate } from "react-router-dom"
import { useModalForComments } from "hooks/popups/useModalForComments";
import { useModalForEditing } from "hooks/popups/useModalForEditing";
import { useNavigateToUserPage } from "hooks/contacts/useNavigateToUserPage"

interface FeedPostCardProps {
    feedPostItem: FeedPost,
    refreshData: () => void;
}



export const FeedPostCard:React.FC<FeedPostCardProps> = ({feedPostItem, refreshData}) => {
    const { user, post } = feedPostItem;
    const { goToUserPage } = useNavigateToUserPage(user)

    const { isModalComments, onOpenModalComments, onCloseModalComments } = useModalForComments()
    const { onOpenModalEdition } = useModalForEditing()



    

    
    return (
        <>
            <Card>
                <CardHeader>
                    <UserDataContainer onClick={goToUserPage}>
                        <Avatar 
                            photo={user?.profileData?.userAvatar} 
                            border={theme.colors.regularDark} 
                            size={'25px'}
                        />
                        <CardUserName>
                            {user?.personalData?.userFullname}
                        </CardUserName>
                    </UserDataContainer>
                    <CardText>
                        recently shared a new post:
                    </CardText>
                </CardHeader>

                <UserPostCard 
                    post={post} 
                    owner={"userProfile"} 
                    onOpenModalWithComments={onOpenModalComments} 
                    onOpenModalForEditing={onOpenModalEdition}
                    postOwner={user}
                    refreshData={refreshData}
                />
            </Card>

            <ModalComments 
                isModalOpen={isModalComments} 
                onCloseModal={onCloseModalComments}
                selectedContent={post}
                contentOwner={user}
                refreshUsersData={refreshData}
            />
        </>
    )
}
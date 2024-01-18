import { FeedPost } from "types/Feed"
import { Card, CardHeader, CardText, CardUserName, UserDataContainer } from "./FeedCards.styled"
import { UserPostCard } from "@components/cards/postsCards/UserPostCard/UserPostCard"
import { useState, useCallback } from "react"
import { ModalComments } from "@components/popups/ModalComments/ModalComments"
import { Avatar } from "@components/Avatar/Avatar"
import { theme } from "@styles/Theme"

interface FeedPostCardProps {
    feedPostItem: FeedPost
}

export const FeedPostCard:React.FC<FeedPostCardProps> = ({feedPostItem}) => {
    const { user, post } = feedPostItem

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
                        recently shared a new post:
                    </CardText>
                </CardHeader>

                <UserPostCard 
                    post={post} 
                    owner={"userProfile"} 
                    onOpenModalWithComments={onOpenModalComments} 
                    onOpenModalForEditing={onOpenModalEdition}
                    postOwner={user}
                />
            </Card>

            <ModalComments 
                isModalOpen={isModalComments} 
                onCloseModal={onCloseModalComments}
                selectedContent={post}
                contentOwner={user}
            />
        </>
    )
}
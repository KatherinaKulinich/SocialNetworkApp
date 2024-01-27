import { FeedPost } from "types/Feed"
import { Card, CardHeader, CardText, CardUserName, UserDataContainer } from "./FeedCards.styled"
import { UserPostCard } from "@components/cards/postsCards/UserPostCard/UserPostCard"
import { useState, useCallback } from "react"
import { ModalComments } from "@components/popups/ModalComments/ModalComments"
import { Avatar } from "@components/Avatar/Avatar"
import { theme } from "@styles/Theme"
import { useAppDispatch } from "hooks/hooks"
import { fetchFriends } from "rdx/slices/friendsSlice"
import { fetchSelectedUserData } from "rdx/slices/usersSlice"
import { useNavigate } from "react-router-dom"
import { message } from "antd"

interface FeedPostCardProps {
    feedPostItem: FeedPost,
}



export const FeedPostCard:React.FC<FeedPostCardProps> = ({feedPostItem}) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const { user, post } = feedPostItem;
    const { userId, userFullname } = user.personalData
    const { friends } = user.contacts
    const ids = friends?.map(user => user.id) || []

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
                    <UserDataContainer onClick={goToUserPage}>
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
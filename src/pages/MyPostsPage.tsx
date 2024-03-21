import img from '@images/myPosts.svg'
import { PageImgTitle } from "@components/PageImgTitle/PageImgTitle"
import { PostPreview } from "@components/cards/UserProfile/components/PostsPreview/PostPreview"
import { AddingNewPostCard } from "@components/cards/postsCards/AddingNewPostCard/AddingNewPostCard"
import { ListContainer } from "@components/containers/ListContainer/ListContainer"
import { PageContainer } from "@components/containers/PageContainer/PageContainer"
import { useMyFullData } from 'hooks/useMyFullData'
import { useAppDispatch, useAppSelector } from 'hooks/hooks'
import { fetchUserFullData } from 'rdx/slices/userDataSlice'
import { useCallback } from 'react'
import { NewUnreadMessagesNotification } from '@components/notifications/NewUnreadMessagesNotification';
import { useUnreadMessages } from 'hooks/chat/useUreadMessages';




export const MyPostsPage: React.FC = () => {
    const myData = useAppSelector(state => state.userData.user)
    const dispatch = useAppDispatch()
    const { userId:myId } = myData?.personalData ?? {};

    const refreshDataAfterPhotoLike = useCallback(() => {
        setTimeout(() => {
            dispatch(fetchUserFullData(myId))
        },2000)
    }, [dispatch, myData])

    const { areUnreadMessages } = useUnreadMessages(myData)
    const isChatsAmount =  areUnreadMessages.length
    const isMessagesNotification = isChatsAmount > 0
  

    return (
        <PageContainer>
            <PageImgTitle 
                image={img} 
                titleFirst='My'
                titleSecond="posts"
            />
            <ListContainer>
                <AddingNewPostCard/>
                <PostPreview
                    postOwner='myProfile'
                    ownerData={myData}
                    refreshData={refreshDataAfterPhotoLike}
                />
            </ListContainer>

            {isMessagesNotification && <NewUnreadMessagesNotification  chatsAmount={isChatsAmount}/>}
        </PageContainer>
    )
}
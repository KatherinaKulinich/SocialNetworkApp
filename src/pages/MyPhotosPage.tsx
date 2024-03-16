import img from '@images/photosPage.svg'
import { PageImgTitle } from '@components/PageImgTitle/PageImgTitle'
import { PageContainer } from '@components/containers/PageContainer/PageContainer';
import { PhotosContainer } from '@components/containers/PhotosContainer/PhotosContainer';
import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { fetchUserFullData } from 'rdx/slices/userDataSlice';
import { NewUnreadMessagesNotification } from '@components/notifications/NewUnreadMessagesNotification';
import { useUnreadMessages } from 'hooks/chat/useUreadMessages';




export const MyPhotosPage:React.FC = () => {
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
                titleSecond='photos'
            />
            <PhotosContainer
                owner='me'
                userOwner={myData}
                myUserData={myData}
                refreshData={refreshDataAfterPhotoLike}
            />

            {isMessagesNotification && <NewUnreadMessagesNotification  chatsAmount={isChatsAmount}/>}
        </PageContainer>
    )
}
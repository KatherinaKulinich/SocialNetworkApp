import img from '@images/photosPage.svg'
import { PageImgTitle } from '@components/PageImgTitle/PageImgTitle'
import { PageContainer } from '@components/containers/PageContainer/PageContainer';
import { PhotosContainer } from '@components/containers/PhotosContainer/PhotosContainer';
import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { fetchUserFullData } from 'rdx/slices/userDataSlice';




export const MyPhotosPage:React.FC = () => {
    const myData = useAppSelector(state => state.userData.user)
    const dispatch = useAppDispatch()
    const { userId:myId } = myData?.personalData ?? {};

    const refreshDataAfterPhotoLike = useCallback(() => {
        setTimeout(() => {
            dispatch(fetchUserFullData(myId))
        },2000)
    }, [dispatch, myData])
  



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
        </PageContainer>
    )
}
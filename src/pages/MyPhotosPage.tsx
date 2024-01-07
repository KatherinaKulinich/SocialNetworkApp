import img from '@images/photosPage.svg'
import { PageImgTitle } from '@components/PageImgTitle/PageImgTitle'
import { PageContainer } from '@components/containers/PageContainer/PageContainer';
import { PhotosContainer } from '@components/containers/PhotosContainer/PhotosContainer';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { useAuth } from 'hooks/authorization/useAuth';
import { fetchUserFullData } from 'rdx/slices/userDataSlice';
import { useEffect } from 'react';




export const MyPhotosPage:React.FC = () => {
    const dispatch = useAppDispatch()
    const { userId } = useAuth()
    const userData = useAppSelector(state => state.userData.user)

    useEffect(() => {
        if (userId) {
            dispatch(fetchUserFullData(userId))
        }
    }, [dispatch, userId])
    


    return (
        <PageContainer>
            <PageImgTitle 
                image={img} 
                titleFirst='My'
                titleSecond='photos'
            />
            <PhotosContainer
                owner='me'
                userOwner={userData}
                myUserData={userData}
            />
        </PageContainer>
    )
}
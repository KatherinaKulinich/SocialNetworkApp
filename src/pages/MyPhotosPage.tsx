import img from '@images/photosPage.svg'
import { PageImgTitle } from '@components/PageImgTitle/PageImgTitle'
import { PageContainer } from '@components/containers/PageContainer/PageContainer';
import { PhotosContainer } from '@components/containers/PhotosContainer/PhotosContainer';
import { useMyFullData } from 'hooks/useMyFullData';




export const MyPhotosPage:React.FC = () => {
    const userData = useMyFullData()
  

    console.log(userData.content.photos);
    
    


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
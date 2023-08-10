import img from '@images/photosPage.svg'
import img1 from '@images/test/1.jpg';
import img2 from '@images/test/2.jpg';
import img3 from '@images/test/3.jpg';
import img4 from '@images/test/4.jpg';
import img5 from '@images/test/5.jpg';
import img6 from '@images/test/6.jpg';
import { PageImgTitle } from '@components/PageImgTitle/PageImgTitle'
import { AddingPhotoCard } from '@components/cards/AddingPhotoCard/AddingPhotoCard'
import { PhotoCard } from '@components/cards/PhotoCard/PhotoCard';
import { PageContainer } from '@components/containers/PageContainer/PageContainer';
import { PhotosContainer } from '@components/containers/PhotosContainer/PhotosContainer';
import { ModalEditing } from '@components/popups/ModalEditing/ModalEditing';
import { useCallback, useState } from 'react';
import { ModalAddingPhoto } from '@components/popups/ModalAddingPhoto/ModalAddingPhoto';
import { ModalComments } from '@components/popups/ModalComments/ModalComments';



export const MyPhotosPage:React.FC = () => {
    const [isModalEditionOpen, setIsModalEditionOpen] = useState(false)

    const onToggleModalEdition = useCallback(() => {
        setIsModalEditionOpen(!isModalEditionOpen)
    }, [isModalEditionOpen])

    const [isModalAddingPhotoOpen, setIsModalAddingPhoto] = useState(false)

    const onToggleModalAdding= useCallback(() => {
        setIsModalAddingPhoto(!isModalAddingPhotoOpen)
    }, [isModalAddingPhotoOpen])

    const [isModalComments, setIsModalComments] = useState(false)
    const onToggleModalComments= useCallback(() => {
        setIsModalComments(!isModalComments)
    }, [isModalComments])


    return (
        <PageContainer>
            <PageImgTitle 
                image={img} 
                titleFirst='My'
                titleSecond='photos'
            />
            <PhotosContainer>
                <AddingPhotoCard/>
                <PhotoCard 
                    imgPath={img1} 
                    description='lalalalalalalahhhhhhhhhh hhhhhhhhhhhhhh hhhhhhhhhhhhhhh hhhhhhhhhhhhhhh lallalallalala lalalalalalalahhhhhhhhhh hhhhhhhhhhhhhh hhhhhhhhhhhhhhh hhhhhhhhhhhhhhh lallalallalala lalalalalalalahhhhhhhhhh hhhhhhhhhhhhhh hhhhhhhhhhhhhhh hhhhhhhhhhhhhhh lallalallalala' 
                    likesSum={23}
                    owner="me"
                />
                <PhotoCard 
                    imgPath={img2} 
                    description='llalalallalallalala' 
                    likesSum={25}
                    owner="me"
                />
                <PhotoCard 
                    imgPath={img3} 
                    description='lalalalalalalalallalallalala' 
                    likesSum={23}
                    owner="me"
                />
                <PhotoCard 
                    imgPath={img4} 
                    description='lalalalalalalalalljjjjjjalallalala' 
                    likesSum={11}
                    owner="me"
                />
                <PhotoCard 
                    imgPath={img5} 
                    description='lalalllalala' 
                    likesSum={9}
                    owner="me"
                />
                <PhotoCard 
                    imgPath={img6} 
                    description='lalalalalafffffffff;lfllflflflalalallalallalala' 
                    likesSum={20}
                    owner="me"
                />
            </PhotosContainer>
            <ModalEditing 
                isModalOpen={isModalEditionOpen} 
                onCloseModal={onToggleModalEdition} 
                textValue={'value'}
            />
            <ModalAddingPhoto 
                isModalOpen={isModalAddingPhotoOpen} 
                onCloseModal={onToggleModalAdding}
            />
            <ModalComments 
                isModalOpen={isModalComments} 
                onCloseModal={onToggleModalComments}
            />
        </PageContainer>
    )
}
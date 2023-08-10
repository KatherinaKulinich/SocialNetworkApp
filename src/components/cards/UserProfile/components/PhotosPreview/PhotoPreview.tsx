import { PhotosBox, Photo } from "./PhotoPreview.styled"
import test1 from '../../../../../assets/images/test/1.jpg';
import test2 from '../../../../../assets/images/test/2.jpg';
import test3 from '../../../../../assets/images/test/3.jpg';
import test4 from '../../../../../assets/images/test/4.jpg';
import test5 from '../../../../../assets/images/test/5.jpg';
import test6 from '../../../../../assets/images/test/6.jpg';
import test7 from '../../../../../assets/images/test/7.jpg';
import test8 from '../../../../../assets/images/test/8.jpg';
import test9 from '../../../../../assets/images/test/9.jpg';



export const PhotoPreview:React.FC = () => {
    return (
        <PhotosBox>
            <Photo src={test1}/>       
            <Photo src={test2}/>       
            <Photo src={test3}/>       
            <Photo src={test4}/>       
            <Photo src={test5}/>       
            <Photo src={test6}/>       
            <Photo src={test7}/>       
            <Photo src={test8}/>       
            <Photo src={test9}/>       
        </PhotosBox>
    )
}
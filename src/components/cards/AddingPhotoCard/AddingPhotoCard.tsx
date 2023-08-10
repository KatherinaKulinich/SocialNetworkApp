import { Card, CardImage, Content } from "./AddingPhotoCard.styled"
import Image from '@images/addNewPhoto.jpg';
import { RegularButton } from "../../buttons/RegularButton/RegularButton";


export const AddingPhotoCard:React.FC = () => {
    return (
        <Card>
            <CardImage src={Image}/>
            <Content>
                <RegularButton 
                    buttonText="Add new photo" 
                    buttonType="button"
                />
            </Content>
        </Card>
    )
}
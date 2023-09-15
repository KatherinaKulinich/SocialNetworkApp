import { Card, CardImage, Content } from "./AddingPhotoCard.styled"
import Image from '@images/addNewPhoto.jpg';
import { RegularButton } from "../../buttons/RegularButton/RegularButton";


interface AddingPhotoCardProps {
    onOpenModal: () => void;
}

export const AddingPhotoCard:React.FC<AddingPhotoCardProps> = ({onOpenModal}) => {
    return (
        <Card>
            <CardImage src={Image}/>
            <Content>
                <RegularButton 
                    buttonText="Add new photo" 
                    buttonType="button"
                    onClickHandler={onOpenModal}
                />
            </Content>
        </Card>
    )
}
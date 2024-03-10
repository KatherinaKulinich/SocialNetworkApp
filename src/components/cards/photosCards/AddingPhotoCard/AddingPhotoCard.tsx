import Image from '@images/addNewPhoto.jpg';
import { Card, CardImage, Content } from "./AddingPhotoCard.styled"
import { RegularButton } from '@components/buttons/RegularButton/RegularButton';



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
import { SecondaryButton } from "@components/buttons/SecondaryButton/SecondaryButton";
import { ModalDefault } from "../ModalDefault/ModalDefault"
import { Container, TextField } from "./ModalEditing.styled";
import { theme } from "@styles/Theme";



interface ModalEditingProps {
    isModalOpen: boolean;
    onCloseModal: () => void;
    textValue: string;
}

export const ModalEditing:React.FC<ModalEditingProps> = ({textValue, isModalOpen, onCloseModal}) => {
    return (
        <ModalDefault title={`Edit photo description`} 
            isModalOpen={isModalOpen} 
            onCloseModal={onCloseModal}
        >
            <Container>
                <TextField  defaultValue={textValue}/>
                <SecondaryButton 
                    buttonColor={theme.colors.regular} 
                    buttonText="Save"
                    onClickHandler={onCloseModal}
                    type="button"
                />
            </Container>
        </ModalDefault>
    )
}
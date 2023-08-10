import { AvatarUpload } from "@components/ProfileEditing/components/AvatarUpload";
import { ModalDefault } from "../ModalDefault/ModalDefault"
import { Form, TextField } from "./ModalAddingPhoto.styled";
import { theme } from "@styles/Theme";
import { SecondaryButton } from "@components/buttons/SecondaryButton/SecondaryButton";

interface ModalAddingPhotoProps {
    isModalOpen: boolean;
    onCloseModal: () => void;
}

export const ModalAddingPhoto:React.FC<ModalAddingPhotoProps> = ({isModalOpen, onCloseModal}) => {
    return (
        <ModalDefault 
            title={"Add new photo"} 
            isModalOpen={isModalOpen} 
            onCloseModal={onCloseModal}
        >
            <Form>
                <AvatarUpload/>
                <TextField placeholder="Photo description"/>
                <SecondaryButton 
                    buttonColor={theme.colors.regular} 
                    buttonText="Save"
                    onClickHandler={onCloseModal}
                    type="button"
                />
            </Form>
        </ModalDefault>
    )
}
import { SecondaryButton } from "@components/buttons/SecondaryButton/SecondaryButton";
import { ModalDefault } from "../ModalDefault/ModalDefault"
import { Container, TextField } from "./ModalEditing.styled";
import { theme } from "@styles/Theme";
import { usePhotos } from "hooks/usePhotos";
import { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "hooks/hooks";



interface ModalEditingProps {
    isModalOpen: boolean;
    onCloseModal: () => void;
}


export const ModalEditing:React.FC<ModalEditingProps> = ({isModalOpen, onCloseModal}) => {

    const { editUserPhoto } = usePhotos();
    
    const selectedPhoto = useAppSelector(state => state.content.selectedPhoto)

    
    const [inputValue, setInputValue] = useState<string>('')
    
    const onChangeInputValue:React.ChangeEventHandler<HTMLTextAreaElement>  = useCallback((event) => {
        setInputValue(event.target.value)
    }, [])
    
    useEffect(() => {
        if (selectedPhoto?.description !== undefined) {
            setInputValue(selectedPhoto.description)
        }
    }, [selectedPhoto])
    
    
    
    const onSaveChanges= useCallback(() => {
        editUserPhoto(inputValue, selectedPhoto)
        onCloseModal()
    }, [inputValue, selectedPhoto])

    
    

    return (
        <ModalDefault title={`Edit photo description`} 
            isModalOpen={isModalOpen} 
            onCloseModal={onCloseModal}
        >
            <Container>
                <TextField  
                    // defaultValue={selectedPhoto?.description}
                    value={inputValue}
                    onChange={onChangeInputValue}
                />
                <SecondaryButton 
                    buttonColor={theme.colors.regular} 
                    buttonText="Save"
                    onClickHandler={onSaveChanges}
                    type="button"
                />
            </Container>
        </ModalDefault>
    )
}
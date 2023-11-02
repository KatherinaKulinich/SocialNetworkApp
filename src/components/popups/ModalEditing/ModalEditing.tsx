import { SecondaryButton } from "@components/buttons/SecondaryButton/SecondaryButton";
import { ModalDefault } from "../ModalDefault/ModalDefault"
import { Container, TextField } from "./ModalEditing.styled";
import { theme } from "@styles/Theme";
import { useMyPhotos } from "hooks/useMyPhotos";
import { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "hooks/hooks";
import { Photo } from "types/Photo";
import { Post } from "types/Post";

type EditableObject = Post | Photo

interface ModalEditingProps {
    isModalOpen: boolean;
    onCloseModal: () => void;
    onEditContent: (value:string, item: Post | Photo) => void;
    selectedObject: Post | Photo;
    currentValue: string;
}


export const ModalEditing:React.FC<ModalEditingProps> = ({isModalOpen, onCloseModal, onEditContent, selectedObject, currentValue}) => {
    const [inputValue, setInputValue] = useState<string>('') 
    
    const onChangeInputValue:React.ChangeEventHandler<HTMLTextAreaElement>  = useCallback((event) => {
        setInputValue(event.target.value)
    }, [])
    
    useEffect(() => {
        if (currentValue) {
            setInputValue(currentValue)
        }
    }, [currentValue])
    
    const onSaveChanges= useCallback(() => {
        onEditContent(inputValue, selectedObject)
        onCloseModal()
    }, [inputValue, selectedObject])

    
    

    return (
        <ModalDefault title={`Edit description`} 
            isModalOpen={isModalOpen} 
            onCloseModal={onCloseModal}
        >
            <Container>
                <TextField  
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
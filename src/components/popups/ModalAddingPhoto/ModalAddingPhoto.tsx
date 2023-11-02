import { PhotoUpload } from "@components/ProfileEditing/components/PhotoUpload";
import { ModalDefault } from "../ModalDefault/ModalDefault"
import { ModalForm, TextField } from "./ModalAddingPhoto.styled";
import { theme } from "@styles/Theme";
import { SecondaryButton } from "@components/buttons/SecondaryButton/SecondaryButton";
import { Form, UploadFile } from "antd";
import { useCallback, useState } from "react";
// import { useMyPhotos } from "hooks/useMyPhotos";
import { useManageMyContent } from "hooks/useManageMyContent";

interface ModalAddingPhotoProps {
    isModalOpen: boolean;
    onCloseModal: () => void;
}

export const ModalAddingPhoto:React.FC<ModalAddingPhotoProps> = ({isModalOpen, onCloseModal}) => {
    const [fileList, setFileList] = useState<UploadFile<any>[]>([])
    const [form] = Form.useForm();
    const { addNewPhoto } = useManageMyContent()

    const onChangeImg = ({fileList: newFileList}:any) => {
        setFileList(newFileList.filter((file: { status: string; }) => file.status !== "error"))
    }

    const saveNewPhoto = useCallback(async (values:any) => {
        onCloseModal()
        form.resetFields()
        setFileList([])

        await addNewPhoto(values)
        
    }, [form, isModalOpen])

    

    return (
        <ModalDefault 
            title={"Add new photo"} 
            isModalOpen={isModalOpen} 
            onCloseModal={onCloseModal}
        >
            <ModalForm 
                onFinish={saveNewPhoto}
                form={form}
                name='newPhotoAdditing'
            >
                <Form.Item 
                    name='photoUpload'
                    rules={[{ required: true, message: 'Please choose a photo from your device' }]}
                >
                    <PhotoUpload
                        onChange={onChangeImg}
                        fileList={fileList}
                        role='photo'
                    />
                </Form.Item>
                <Form.Item 
                    name='photoDescription' 
                    style={{width: '100%'}}
                >
                    <TextField 
                        placeholder="Photo description" 
                        style={{width: '100%'}}
                    />
                </Form.Item>
                <SecondaryButton 
                    buttonColor={theme.colors.regular} 
                    buttonText="Save"
                    onClickHandler={onCloseModal}
                    type="submit"
                />
            </ModalForm>
        </ModalDefault>
    )
}
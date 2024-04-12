import { Modal, Upload, message } from "antd"
import { useState } from "react";
import type { RcFile, UploadFile } from 'antd/es/upload';
import { Icon } from "@components/icons/Icon";
import { PiUserCirclePlusDuotone } from 'react-icons/Pi';
import { MdImageSearch } from 'react-icons/Md';


const getBase64 = (file: RcFile):any => {
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
}

interface PhotoUploadProps {
    onChange: ({fileList}:any) => void;
    fileList: UploadFile<any>[];
    role: 'avatar' | 'photo'
}





export const PhotoUpload:React.FC<PhotoUploadProps> = ({onChange, role, fileList}) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file: UploadFile) => {
        if (!file.thumbUrl && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }

        setPreviewImage(file.thumbUrl || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.thumbUrl!.substring(file.thumbUrl!.lastIndexOf('/') + 1));
    };



    const beforeUpload = (file: RcFile) => {
        if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
            message.error(`${file.name} is not a valid image type`, 2);
            return;
        }
        return false;
    };
    

    return (
       <>
            <Upload 
                method="post"
                fileList={fileList}
                listType={role === 'avatar' ? "picture-circle" : "picture-card"}
                multiple={false}
                maxCount={1}
                style={{padding: 3, objectFit: 'cover'}}
                onPreview={handlePreview}
                onChange={onChange}
                beforeUpload={beforeUpload}
            >
                <div>
                    <Icon
                        icon={role === 'avatar' ? <PiUserCirclePlusDuotone/> : <MdImageSearch/>}
                        iconSize="26px"
                    /> 
                    <div style={{ marginTop: 4, fontSize: 10, maxWidth: 60 }}>
                        {`choose new ${role === 'avatar' ? 'avatar' : 'photo'}`}
                    </div>
                </div>
            </Upload>
            <Modal 
                open={previewOpen} 
                title={previewTitle} 
                footer={null} 
                onCancel={handleCancel}
            >
                <img 
                    alt={role === 'avatar' ? 'avatar' : 'photo'} 
                    style={{ width: '100%' }} 
                    src={previewImage} 
                />
            </Modal>
       </>
    )
}
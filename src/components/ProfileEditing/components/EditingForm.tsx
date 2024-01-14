import { Row, Col, Input, Form, Radio, DatePicker, Space, Select, UploadFile, message } from "antd"
import { PhotoUpload } from "./PhotoUpload";
import { useCallback, useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { RegularButton } from "@components/buttons/RegularButton/RegularButton";
import { listOfHobbies, genderOptions, famStatusOptions } from "utils/data/profileOptions";
import { SelectTag } from "./SelectTag";
import { useEditProfile } from "hooks/settings/useEditProfile";
import { dateFormat, getFormFields } from "utils/getFormFields";
import { UserProfile } from "types/UserProfile";
import { useMyFullData } from "hooks/useMyFullData";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

interface EditingFormProps {
    buttonText: string;
    navigation?: string;
}


export const EditingForm:React.FC<EditingFormProps> = ({buttonText, navigation}) => {
    const [form] = Form.useForm();
    const navigate = useNavigate()
    const userData = useMyFullData()
    
    const { userName, userSurname } = userData?.personalData ?? {};
    const { userGender, userBirthday, userFamStatus, userCity, userCountry, userInterests, userAbout, userAvatar } = userData?.profileData ?? {};
    const { registerDate } = userData?.additionalData ?? {};

    const { updateUserProfile } = useEditProfile()
    const [fileList, setFileList] = useState<UploadFile<any>[]>([])

    const onChangeImg = ({fileList: newFileList}:any) => {
        setFileList(newFileList.filter((file: { status: string; }) => file.status !== "error"))
    }

    const defaultUserAvatar: UploadFile<any>[] = [{
        thumbUrl: userAvatar,
        name: `avatar${userName}`,
        uid: `${registerDate}`,
        crossOrigin: '',
        type: 'image/jpeg',
        status: 'done',
    }]
    
    useEffect(() => {
        if (Object.keys(userData).length === 0) return;
        setFileList(defaultUserAvatar)
    }, [userData])
    

    const maxDate = new Date().getFullYear() - 90;
    const minDate = new Date().getFullYear() - 16;

    const saveUserData = useCallback(async(values:any) => {
        await updateUserProfile(values)
        await message.success('The profile has been updated!')
        navigation && navigate(navigation)
        navigation && await message.success(`Welcome to the app, ${userName}`)
    }, [])

    useEffect(() => {
        form.setFieldsValue({
            userName: userName || '',
            userSurname: userSurname || '',
            userGender: userGender || '',
            userBirthday: userBirthday && dayjs(`${userBirthday.fullDate}`, dateFormat),
            userFamStatus:  userFamStatus || '',
            userCity: userCity || '',
            userCountry: userCountry || '',
            userInterests: userInterests.length > 0 ? userInterests : ['Coding'],
            userAbout: userAbout || '',
        })
    }, [])


    return (
        <Form 
            form={form}
            name="editingForm"
            layout="vertical" 
            style={{width: '100%', maxWidth: 700 }}
            labelCol={{ span: 16 }}
            wrapperCol={{ span: 16 }}
            autoComplete="off"
            onFinish={(values) => {
                saveUserData(values)
            }}
        >
            <Space 
                direction="vertical" 
                size="middle" 
                style={{ display: 'flex' }}
            >
                <Row 
                    gutter={24} 
                    justify={"space-between"} 
                    align={'middle'}
                >
                    <Col xs={24} lg={12}>
                        <Form.Item name={'userAvatar'}>
                            <PhotoUpload 
                                fileList={fileList}
                                onChange={onChangeImg}
                                role="avatar"
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} lg={12}>
                        <Form.Item
                            label="Name"
                            name="userName"
                            wrapperCol={{span: 24, offset: 0}}
                            rules={[{ required: true, message: 'Please enter your name' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Surname"
                            name="userSurname"
                            wrapperCol={{span: 24, offset: 0}}
                            rules={[{ required: true, message: 'Please enter your surname' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row 
                    gutter={24} 
                    justify={"space-between"} 
                    align={'middle'}
                >
                    <Col xs={24} lg={12}>
                        <Form.Item
                            label="Gender"
                            name="userGender"
                            rules={[{ required: true, message: 'Please select your gender' }]}
                            labelAlign="left"
                            wrapperCol={{span: 10, offset: 0}}
                        >
                            <Radio.Group 
                                options={genderOptions} 
                                optionType="button" 
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} lg={12}>
                        <Form.Item
                            label="Birthday"
                            name="userBirthday"
                            labelAlign="left"
                            wrapperCol={{span: 10, offset: 0}}
                            rules={[{ required: true, message: 'Please chose your birth date' }]}
                        >
                            <DatePicker 
                                format={dateFormat} 
                                disabledDate={d => !d || d.isAfter(`${minDate}/12/31`) || d.isBefore(`${maxDate}/01/01`) }
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row 
                    gutter={24}  
                    justify={"space-between"} 
                    align={'middle'}
                >
                    <Col xs={24} lg={12}>
                        <Form.Item
                            label="Country"
                            name="userCountry"
                            wrapperCol={{span: 24, offset: 0}}
                            rules={[{ required: true, message: 'Please write down your country' }]}
                        >
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col xs={24} lg={12}>
                        <Form.Item
                            label="City"
                            name="userCity"
                            wrapperCol={{span: 24, offset: 0}}
                            rules={[{ required: true, message: 'Please write down your city' }]}
                        >
                            <Input/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row 
                    gutter={24} 
                    justify={"space-between"} 
                    align={'middle'}
                >
                    <Col span={12}>
                        <Form.Item
                            label="Choose your family status"
                            name="userFamStatus"
                            wrapperCol={{span: 24, offset: 0}}
                        >
                            <Select options={famStatusOptions} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row 
                    gutter={24}  
                    justify={"space-between"} 
                    align={'middle'}
                >
                    <Col xs={24} lg={24}>
                        <Form.Item 
                            label="Interests/hobbies"
                            name="userInterests"
                            wrapperCol={{span: 24, offset: 0}}
                        >
                            <Select
                                mode="multiple"
                                tagRender={SelectTag}
                                options={listOfHobbies} 
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row
                    gutter={24}  
                    justify={"space-between"} 
                    align={'middle'}
                >
                    <Col xs={24} lg={24}>
                        <Form.Item
                            label="About"
                            name="userAbout"
                            wrapperCol={{span: 24, offset: 0}}
                        >
                            <TextArea
                                placeholder="Please share some sentences about your personality..."
                                autoSize={{ minRows: 3, maxRows: 5 }}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row  justify={"center"} align={'middle'}>
                    <Col>
                        <RegularButton 
                            buttonText={buttonText} 
                            buttonType={"submit"}
                        />
                    </Col>
                </Row>
            </Space>
        </Form>
    )
}
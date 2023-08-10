import { Row, Col, Input, Form, Radio, RadioChangeEvent, DatePicker, Space, Select } from "antd"
import { AvatarUpload } from "./AvatarUpload";
import { useState } from "react";
import dayjs from 'dayjs';
import TextArea from "antd/es/input/TextArea";
import { RegularButton } from "@components/buttons/RegularButton/RegularButton";

interface EditingFormProps {
    buttonText: string;
}


export const EditingForm:React.FC<EditingFormProps> = ({buttonText}) => {
    const [gender, setGender] = useState('Male');
    const genderOptions = [
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
    ];

    const famStatusOptions = [
        { label: 'Single', value: 'single' },
        { label: 'In a relationship', value: 'relationship' },
        { label: 'Married', value: 'Married' },
        { label: 'Engaged', value: 'Engaged' },
        { label: 'Divorced', value: 'Divorced' },
    ]

    const onChangeGenderValue = ({ target: { value } }: RadioChangeEvent) => {
        setGender(value);
    };


    const maxDate = new Date().getFullYear() - 90;
    const minDate = new Date().getFullYear() - 16;

    return (
        <Form 
            layout="vertical" 
            style={{width: '100%', maxWidth: 700}}
            labelAlign="left"
            labelWrap
            wrapperCol={{ flex: 1 }}
            colon={false}
            // labelCol={{ flex: '10px'}}
              
            // labelCol={{ span: 8 }} 
            // wrapperCol={{ span: 16 }}
        >
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                <Row gutter={24} justify={"center"} align={'middle'}>
                    <Col xs={24} lg={10}>
                        <Form.Item
                            name="avatar"
                            // rules={[{ required: true, message: 'Please enter user name' }]}
                        >
                            <AvatarUpload/>
                        </Form.Item>
                    </Col>
                    <Col xs={24} lg={10}>
                        <Form.Item
                            label="Name"
                            name="userName"
                            rules={[{ required: true, message: 'Please enter your name' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Surame"
                            name="userSurname"
                            rules={[{ required: true, message: 'Please enter your surname' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24} justify={"center"} align={'middle'}>
                    <Col xs={24} lg={10}>
                        <Form.Item
                            label="Gender"
                            name="userGender"
                            rules={[{ required: true, message: 'Please select your gender' }]}
                            
                            // labelCol={{ style: { order: 2 } }}
                        >
                            <Radio.Group 
                                options={genderOptions} 
                                onChange={onChangeGenderValue} 
                                value={gender} 
                                optionType="button" 
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} lg={10}>
                        <Form.Item
                            label="Birthday"
                            name="userBirthday"

                            rules={[{ required: true, message: 'Please chose your birth date' }]}
                        >
                            <DatePicker 
                                defaultValue={dayjs('01/01/2000')} format={'DD/MM/YYYY'} 
                                disabledDate={d => !d || d.isAfter(`${minDate}-12-31`) || d.isBefore(`${maxDate}-01-01`) }
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row 
                    gutter={24} 
                    justify={"center"} 
                    align={'middle'}
                >
                    <Col span={10}>
                         <Form.Item
                            label="Choose your family status"
                            name="userFamStatus"
                            // rules={[{ required: true, message: 'Please write down your city' }]}
                        >
                            <Select
                                // defaultValue=""
                                style={{ width: 300 }}
                                // onChange={handleChange}
                                options={famStatusOptions}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}  justify={"center"} align={'middle'}>
                    <Col xs={24} lg={10}>
                        <Form.Item
                            label="City"
                            name="userCity"
                            rules={[{ required: true, message: 'Please write down your city' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xs={24} lg={10}>
                        <Form.Item
                            label="Country"
                            name="userCountry"
                            rules={[{ required: true, message: 'Please write down your country' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}  justify={"center"} align={'middle'}>
                    <Col xs={24} lg={10}>
                        <Form.Item
                            label="Interests/hobbies"
                            name="userInterests"
                            // rules={[{ required: true, message: 'Surname' }]}
                        >
                            <TextArea
                                // value={value}
                                // onChange={(e) => setValue(e.target.value)}
                                placeholder="Put down some information about your interests or hobbies..."
                                autoSize={{ minRows: 3, maxRows: 5 }}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} lg={10}>
                        <Form.Item
                            label="About"
                            name="userAbout"
                            // rules={[{ required: true, message: 'Please share some sentences about your personality' }]}
                        >
                            <TextArea
                                // value={value}
                                // onChange={(e) => setValue(e.target.value)}
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
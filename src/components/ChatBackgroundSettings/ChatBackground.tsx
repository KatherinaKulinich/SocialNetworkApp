import { Form } from "antd";
import { Group, Background, Container, RadioItem, BackgroundForm } from "./ChatBackground.styled"
import { RegularButton } from "@components/buttons/RegularButton/RegularButton";
import { SubTitle } from "@components/text/Subtitle";
import { backgrounds } from "utils/backgrounds";
import { useAppSelector } from "hooks/hooks";
import { useEditProfile } from "hooks/useEditProfile";



export const ChatBackground:React.FC = () => {
    const [form] = Form.useForm();
    const { chatBackground } = useAppSelector(state => state.userData.user)
    const { updateChatBackground } = useEditProfile();
    


    return (
        <Container>
            <SubTitle text='Choose a background for chats'/>
            <BackgroundForm 
                form={form}
                name="editingBackground"
                layout="vertical" 
                initialValues={{chatBackground}}
                onFinish={(values:any) => {
                    console.log(values)
                    updateChatBackground(values.chatBackground)
                }}
            >
                <Form.Item name='chatBackground'>
                    <Group>
                        {backgrounds.map(item => (
                            <RadioItem 
                                value={item.value} 
                                key={item.id}
                            >
                                <Background $url={item.url}/>
                            </RadioItem>
                        ))}
                    </Group>
                </Form.Item>
                <Form.Item>
                    <RegularButton buttonText="Save background" buttonType="submit"/>
                </Form.Item>
            </BackgroundForm>
        </Container>
    )
}
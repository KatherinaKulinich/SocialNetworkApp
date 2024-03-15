import { Form } from "antd";
import { Group, Background, Container, RadioItem, BackgroundForm } from "./ChatBackground.styled"
import { RegularButton } from "@components/buttons/RegularButton/RegularButton";
import { SubTitle } from "@components/text/Subtitle";
import { backgrounds } from "utils/data/backgrounds";
import { useAppSelector } from "hooks/hooks";
import { useChatSettings } from "hooks/settings/useChatSettings";





export const ChatBackground:React.FC = () => {
    const [form] = Form.useForm();
    const { updateChatBackground } = useChatSettings();

    const userData = useAppSelector(state => state.userData.user)
    const { chatBackground } = userData.additionalData

    
    return (
        <Container id="chat-background">
            <SubTitle text='Choose a background for chats'/>
            <BackgroundForm 
                form={form}
                name="editingBackground"
                layout="vertical" 
                initialValues={{chatBackground}}
                onFinish={(values:any) => {
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
                    <RegularButton 
                        buttonText="Save background" 
                        buttonType="submit"
                    />
                </Form.Item>
            </BackgroundForm>
        </Container>
    )
}
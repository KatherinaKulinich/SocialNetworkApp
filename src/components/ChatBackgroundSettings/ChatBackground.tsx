import { Form } from "antd";
import { Group, Background, Container, RadioItem, BackgroundForm } from "./ChatBackground.styled"
import { RegularButton } from "@components/buttons/RegularButton/RegularButton";
import { SubTitle } from "@components/text/Subtitle";
import { backgrounds } from "utils/backgrounds";

export const ChatBackground:React.FC = () => {
    return (
        <Container>
            <SubTitle text='Choose a background for chats'/>
            <BackgroundForm layout="vertical" initialValues={{chatBackground: backgrounds[0].value}}>
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
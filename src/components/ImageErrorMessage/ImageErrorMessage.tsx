import { Container, Image, Text } from "./ImageErrorMessage.styled"


interface ImageErrorMessageProps {
    image: string;
    text: string;
}




export const ImageErrorMessage:React.FC<ImageErrorMessageProps> = ({image, text}) => {
    return (
        <Container>
            <Image src={image}/>
            <Text>{text}</Text>
        </Container>
    )
}
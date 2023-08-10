import { Container, Image } from "./ImageErrorMessage.styled"
import { SubTitle } from "@components/text/Subtitle";


interface ImageErrorMessageProps {
    image: string;
    text: string;
}

export const ImageErrorMessage:React.FC<ImageErrorMessageProps> = ({image, text}) => {
    return (
        <Container>
            <Image src={image}/>
            <SubTitle text={text}/>
        </Container>
    )
}
import { Title } from "@components/text/Title";
import { Image, TitleContainer, TextContainer } from "./PageImgTitle.styled";

interface PageImgTitleProps {
    image: string;
    titleFirst: string;
    titleSecond?: string;
}

export const PageImgTitle:React.FC<PageImgTitleProps> = ({image, titleFirst, titleSecond}) => {
    return (
        <TitleContainer>
            <TextContainer>
                <Title text={titleFirst}/>
                {titleSecond && (
                    <Title text={titleSecond}/>
                )}
            </TextContainer>
            <Image src={image}/>
        </TitleContainer>
    )
}
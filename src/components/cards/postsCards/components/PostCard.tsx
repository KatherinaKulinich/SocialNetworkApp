import { CardContainer, CardHeader, MainContent, CardFooter } from "./PostCard.styled"

interface PostCardProps {
    header: React.ReactNode,
    content: React.ReactNode,
    footer: React.ReactNode,
}



export const PostCard:React.FC<PostCardProps> = ({header, content, footer}) => {

    return (
        <CardContainer>
            <CardHeader>
                {header}
            </CardHeader>
            <MainContent>
                {content}
            </MainContent>
            <CardFooter>
                {footer}
            </CardFooter>
        </CardContainer>
    )
}
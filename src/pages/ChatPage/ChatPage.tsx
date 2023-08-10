import { Chat } from "@components/chat/Chat/Chat"
import { PageImgTitle } from "@components/PageImgTitle/PageImgTitle"
import { ChatsContainer } from "@components/containers/ChatsContainer/ChatsContainer"
import img from '@images/chat.svg'
import { Container, ChatsPreview, MainChat } from "./ChatPage.styled"
import { useWindowSize } from "../../hooks/useWindowSize"



export const ChatPage:React.FC = () => {
    const {width} = useWindowSize();
    
    return (
        <Container>
            {width >= 1240 && (
                <ChatsPreview>
                    <ChatsContainer/>
                </ChatsPreview>
            )}
            <MainChat>
                <PageImgTitle 
                    image={img} 
                    titleFirst={"chat"} 
                    titleSecond="with Anna"
                />
                <Chat/>
            </MainChat>
        </Container>
    )
}
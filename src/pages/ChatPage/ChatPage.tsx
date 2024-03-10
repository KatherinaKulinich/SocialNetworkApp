import img from '@images/chat.svg'
import { Chat } from "@components/chat/Chat/Chat"
import { PageImgTitle } from "@components/PageImgTitle/PageImgTitle"
import { ChatsContainer } from "@components/containers/ChatsContainer/ChatsContainer"
import { Container, ChatsPreview, MainChat } from "./ChatPage.styled"
import { useWindowSize } from "../../hooks/useWindowSize"
import { useAppDispatch, useAppSelector } from 'hooks/hooks'
import { useCallback } from 'react'
import { useMyFullData } from 'hooks/useMyFullData'
import { fetchChatData } from 'rdx/slices/chatSlice'



export const ChatPage:React.FC = () => {
    const dispatch = useAppDispatch()
    const { width } = useWindowSize();

    // const myData = useAppSelector(state => state.userData.user)
    const myData = useMyFullData()
    const { chats } = myData

    const user = useAppSelector(state => state.users.selectedUser )
    const { userName } = user?.personalData ?? ''

    



    
    return (
        <Container>
            {width >= 1240 && (
                <ChatsPreview>
                    <ChatsContainer 
                        chatsData={chats} 
                    />
                </ChatsPreview>
            )}
            <MainChat>
                <PageImgTitle 
                    image={img} 
                    titleFirst={"chat"} 
                    titleSecond={userName && `with ${userName}`}
                />
                <Chat user={user}/>
            </MainChat>
        </Container>
    )
}
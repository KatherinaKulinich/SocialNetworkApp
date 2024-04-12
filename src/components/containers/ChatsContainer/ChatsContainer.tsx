import { ChatItemCard } from "@components/cards/ChatItemCard/ChatItemCard"
import { ListContainer } from "../ListContainer/ListContainer"
import { Chat } from "types/Chat";
import { useUnreadMessages } from 'hooks/chat/useUreadMessages'
import { useAppSelector } from "hooks/hooks";



interface ChatsContainerProps {
    chatsData: Array<Chat>,
}



export const ChatsContainer:React.FC<ChatsContainerProps> = ({chatsData}) => {

    const sortedChats = [...chatsData]?.sort((a, b) => {
        return b.updatedAt - a.updatedAt
    }) 

    const myData = useAppSelector(state => state.userData.user)
    const { checkChatForNewMessages } = useUnreadMessages(myData)

    
    return (
        <ListContainer>
            {chatsData?.length > 0 && (
                sortedChats?.map((chatItem) => (
                    <ChatItemCard 
                        key={chatItem.chatId}
                        chatItemData={chatItem}
                        isChatWithNewMessages={checkChatForNewMessages(chatItem.chatId)}
                    />
                ))
            )}
        </ListContainer>
    )
}
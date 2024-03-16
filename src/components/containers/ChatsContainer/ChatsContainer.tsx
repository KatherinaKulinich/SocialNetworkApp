import { ChatItemCard } from "@components/cards/ChatItemCard/ChatItemCard"
import { ListContainer } from "../ListContainer/ListContainer"
import { Chat } from "types/Chat";
import { useMyFullData } from "hooks/useMyFullData";
import { useUnreadMessages } from 'hooks/chat/useUreadMessages'


interface ChatsContainerProps {
    chatsData: Array<Chat>,
}



export const ChatsContainer:React.FC<ChatsContainerProps> = ({chatsData}) => {

    const sortedChats = [...chatsData]?.sort((a, b) => {
        return b.updatedAt - a.updatedAt
    }) 

    const myData = useMyFullData()
    const { checkChatForNewMessages } = useUnreadMessages(myData)

    // const checkChatForNewMessages = (id:string) => {
    //     if (areUnreadMessages.includes(id)) return true
    //     return false
    // }

    
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
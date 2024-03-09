import { ChatItemCard } from "@components/cards/ChatItemCard/ChatItemCard"
import { ListContainer } from "../ListContainer/ListContainer"
import userTest from '@images/userTest.jpg';
import { Chat } from "types/Chat";


interface ChatsContainerProps {
    chatsData: Array<Chat>
}



export const ChatsContainer:React.FC<ChatsContainerProps> = ({chatsData}) => {

    return (
        <ListContainer>
            {chatsData?.length > 0 && (
                chatsData.map((chatItem) => (
                    <ChatItemCard 
                        key={chatItem.chatId}
                        chatItemData={chatItem}
                    />
                ))
            )}
        </ListContainer>
    )
}
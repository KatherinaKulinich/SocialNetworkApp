import { ChatItemCard } from "@components/cards/ChatItemCard/ChatItemCard"
import { ListContainer } from "../ListContainer/ListContainer"
import userTest from '@images/userTest.jpg';
import { Chat } from "types/Chat";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";


interface ChatsContainerProps {
    chatsData: Array<Chat>,
}



export const ChatsContainer:React.FC<ChatsContainerProps> = ({chatsData}) => {

    const sortedChats = [...chatsData]?.sort((a, b) => {
        return b.updatedAt - a.updatedAt
    }) 
    

    return (
        <ListContainer>
            {chatsData?.length > 0 && (
                sortedChats?.map((chatItem) => (
                    <ChatItemCard 
                        key={chatItem.chatId}
                        chatItemData={chatItem}
                    />
                ))
            )}
        </ListContainer>
    )
}
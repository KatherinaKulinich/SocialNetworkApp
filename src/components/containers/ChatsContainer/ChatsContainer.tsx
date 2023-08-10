import { ChatItemCard } from "@components/cards/ChatItemCard/ChatItemCard"
import { ListContainer } from "../ListContainer/ListContainer"
import userTest from '@images/userTest.jpg';

export const ChatsContainer:React.FC = () => {
    return (
        <ListContainer>
            <ChatItemCard userAvatar={userTest} userName='Ivan Ivanov' lastMessage='Hello! See you later'/>
            <ChatItemCard userAvatar={userTest} userName='Ivan Ivanov' lastMessage='Hello! See you later'/>
            <ChatItemCard userAvatar={userTest} userName='Ivan Ivanov' lastMessage='Hello! See you later Hello! See you later Hello! See you later'/>
            <ChatItemCard userAvatar={userTest} userName='Ivan Ivanov' lastMessage='Hello! See you later'/>
            <ChatItemCard userAvatar={userTest} userName='Ivan Ivanov' lastMessage='Hello! See you later'/>
            <ChatItemCard userAvatar={userTest} userName='Ivan Ivanov' lastMessage='Hello! See you later'/>
            <ChatItemCard userAvatar={userTest} userName='Ivan Ivanov' lastMessage='Hello! See you later'/>
            <ChatItemCard userAvatar={userTest} userName='Ivan Ivanov' lastMessage='Hello! See you later Hello! See you later Hello! See you later'/>
            <ChatItemCard userAvatar={userTest} userName='Ivan Ivanov' lastMessage='Hello! See you later'/>
            <ChatItemCard userAvatar={userTest} userName='Ivan Ivanov' lastMessage='Hello! See you later'/>
            <ChatItemCard userAvatar={userTest} userName='Ivan Ivanov' lastMessage='Hello! See you later'/>
            <ChatItemCard userAvatar={userTest} userName='Ivan Ivanov' lastMessage='Hello! See you later'/>
            <ChatItemCard userAvatar={userTest} userName='Ivan Ivanov' lastMessage='Hello! See you later'/>
            <ChatItemCard userAvatar={userTest} userName='Ivan Ivanov' lastMessage='Hello! See you later Hello! See you later Hello! See you later'/>
            <ChatItemCard userAvatar={userTest} userName='Ivan Ivanov' lastMessage='Hello! See you later'/>
            <ChatItemCard userAvatar={userTest} userName='Ivan Ivanov' lastMessage='Hello! See you later'/>
            <ChatItemCard userAvatar={userTest} userName='Ivan Ivanov' lastMessage='Hello! See you later'/>
        </ListContainer>
    )
}
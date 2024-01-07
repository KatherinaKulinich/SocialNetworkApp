import { Container, Name, UserInfo } from "./ChatHeader.styled"
import user from '@images/404.svg';
import { theme } from "@styles/Theme";
import { MdDoubleArrow } from 'react-icons/Md';
import { IconButton } from "@components/buttons/IconButton/IconButton";
import { Link } from "react-router-dom";
import { Avatar } from "@components/Avatar/Avatar";



export const ChatHeader:React.FC = () => {
    return (
        <Container>
            <Link to={'/myChats'}>
                <IconButton 
                    icon={<MdDoubleArrow style = {{transform: 'rotate(180deg)' }}/>} 
                    color={theme.colors.regular} 
                    size={"40px"} 
                    type={"button"} 
                />
            </Link>
            <UserInfo>
                <Avatar 
                    photo={user} 
                    border={theme.colors.regular} 
                    size='30px'
                />
                <Name>
                    Anna Ivanova
                </Name>
            </UserInfo>
        </Container>
    )
}
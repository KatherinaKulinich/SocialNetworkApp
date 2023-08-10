import { styled } from "styled-components";
import { PageImgTitle } from "@components/PageImgTitle/PageImgTitle"
import { UserProfile } from "@components/cards/UserProfile/UserProfile"
import { PageContainer } from "@components/containers/PageContainer/PageContainer"
import { TextIconButton } from "@components/buttons/TextIconButton/TextIconButton";
import img from '@images/friendprofile.svg';
import { theme } from "@styles/Theme";
import { useNavigate } from "react-router-dom";
import { BsFillChatSquareHeartFill } from 'react-icons/Bs'
import { FaUserPlus, FaUserMinus  } from 'react-icons/Fa'
import { useCallback, useState } from "react";




export const FriendProfilePage:React.FC = () => {
    const [isFriend, setIsFriend] = useState(true)
    const navigate = useNavigate();

    const onGoToChat = useCallback(() => {
        navigate('/myChats/chat')
    },[])

    return (
        <PageContainer>
            <PageImgTitle 
                image={img} 
                titleFirst="Anna's"
                titleSecond="profile"
            />
            <Actions>
                <TextIconButton 
                    icon={<BsFillChatSquareHeartFill />} 
                    text={"Chat to Anna"} 
                    color={theme.colors.regularDark} 
                    textSize={12} 
                    iconSize={"30px"} 
                    buttonType={"button"}
                    fontWeight={600}
                    onClickHandler={onGoToChat}
                />
                <TextIconButton 
                    icon={isFriend? <FaUserMinus/> : <FaUserPlus/>} 
                    text={isFriend ? 'Remove from friends' :'Add to friends'} 
                    color={theme.colors.regularDark} 
                    textSize={12} 
                    iconSize={"30px"} 
                    buttonType={"button"}
                    fontWeight={600}
                    // onClickHandler={}
                />
            </Actions>
            <UserProfile/>
        </PageContainer>
    )
}

const Actions = styled.div`
    align-self: end;
    display:flex;
    align-items: center;
    gap:30px;
`
import { AiFillGithub, AiFillLinkedin, AiOutlineUser } from "react-icons/Ai"
import { SiGmail } from "react-icons/Si"
import { Icon } from '@components/icons/Icon'
import { FooterText } from "../../Footer.styled"
import { Container,  IconsBox, IconLink, Content, ProfileCard, ProfileCardText, ProfileCardTitle } from "./Created.styled";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { useNavigate } from "react-router-dom";
import { fetchSelectedUserData } from "rdx/slices/usersSlice";
import { fetchFriends } from "rdx/slices/friendsSlice";
import { message } from "antd";






export const Created:React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const MY_ID = import.meta.env.VITE_MY_ID;


    const user = useAppSelector(state => state.users.selectedUser)
    const userFullname = user?.personalData?.userFullname
    const friends = user?.contacts?.friends
    const ids = friends?.map(user => user.id) || []

    
    
    
    const goToMyProfilePage = useCallback(async () => {
        message.loading('Loading the page...', 6)
        await dispatch(fetchSelectedUserData(MY_ID)) 
        if (ids && userFullname) {
            await dispatch(fetchFriends(ids, 'friends')) 
            setTimeout(navigate, 6000, `/users/${userFullname}/profile`)
        }
    }, [dispatch, navigate])


    return (
        <Container>
            <Content>
                <Content>
                    <FooterText>
                        Social Network App
                    </FooterText>
                    <FooterText>
                        Created by Kateryna Kulinich
                    </FooterText>
                </Content>
                <IconsBox>
                    <IconLink 
                        href="https://github.com/KatherinaKulinich" 
                        target="_blank"
                    >
                        <Icon 
                            icon={<AiFillGithub/>} 
                            iconColor='#FFFFFF' 
                            iconSize='20px'
                        />
                    </IconLink>
                    <IconLink 
                        href="https://www.linkedin.com/in/kateryna-kulinich-31672025a/" 
                        target="_blank"
                    >
                        <Icon 
                            icon={<AiFillLinkedin/>} 
                            iconColor='#FFFFFF' 
                            iconSize='20px'
                        />
                    </IconLink>
                    <IconLink href="mailto:kulinichcatherina@gmail.com">
                        <Icon 
                            icon={<SiGmail/>} 
                            iconColor='#FFFFFF' 
                            iconSize='20px'
                        />
                    </IconLink>
                </IconsBox>
            </Content>
            <ProfileCard onClick={goToMyProfilePage}>
                <Icon 
                    icon={<AiOutlineUser/>} 
                    iconColor='#FFFFFF' 
                    iconSize='36px'
                />
                <ProfileCardText>
                    <ProfileCardTitle>My profile</ProfileCardTitle>
                    <FooterText>in this app</FooterText>
                </ProfileCardText>
            </ProfileCard>
        </Container>
    )
}
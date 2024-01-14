import { AiFillGithub, AiFillLinkedin, AiOutlineUser } from "react-icons/Ai"
import { SiGmail } from "react-icons/Si"
import { Icon } from '@components/icons/Icon'
import { FooterText } from "../../Footer.styled"
import { Container,  IconsBox, IconLink, Content, ProfileCard, ProfileCardText, ProfileCardTitle } from "./Created.styled";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { useNavigate } from "react-router-dom";
import { fetchSelectedUserData } from "rdx/slices/usersSlice";
import { fetchFriends, getFriendsData } from "rdx/slices/friendsSlice";






export const Created:React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const MY_ID = import.meta.env.VITE_MY_ID;
    const MY_NAME = import.meta.env.VITE_MY_FULLNAME;

    const user = useAppSelector(state => state.users.selectedUser)
    const friends = user?.contacts?.friends
    const ids = friends?.map(user => user.id) || []
    const friendsData = useAppSelector(state => state.friends.friendsData)
    
    
    
    const goToMyProfilePage = useCallback(async () => {
        // dispatch(fetchFriends([], 'friends'))
        await dispatch(fetchSelectedUserData(MY_ID)) 
        if (ids) {
            await dispatch(fetchFriends(ids, 'friends')) 
            navigate(`/users/${MY_NAME}/profile`)
        }
    }, [dispatch, MY_ID, friends, friendsData, user])


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
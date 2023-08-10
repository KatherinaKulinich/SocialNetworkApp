import peopleImg from '@images/peopleIntro.svg';
import startImg from '@images/startImg.svg'
import { RegularButton } from '@components/buttons/RegularButton/RegularButton';
import { SubTitle } from '@components/text/Subtitle';
import { Title } from '@components/text/Title';
import { useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import { PageContainer } from '@components/containers/PageContainer/PageContainer';
import { Paragraph } from '@components/text/Paragraph';
import { theme } from '@styles/Theme';
import { Container, Image } from './IntroPage.styled';
import { Wrapper } from '@components/layout/components/Wrapper/Wrapper';







export const IntroPage:React.FC = () => {
    const navigate = useNavigate();

    const onGoToLogin = useCallback(() => {
        navigate('/login')
    }, [])

    
    return (
            <Wrapper>
                <PageContainer>
                    <Image src={peopleImg}/>
                    <Container $gap='5px'>
                        <Title text={'Welcome'}/>
                        <SubTitle text={'to the Social Network App!'}/>
                    </Container>
                    <Container $gap='15px'>
                        <Paragraph 
                            color={theme.colors.textColor} 
                            text="In today's digital age, social networking has become an integral part of our daily lives. 
                            Whether it's connecting with friends, sharing updates, or discovering new interests, 
                            social networks have transformed the way we interact with others. 
                            One such social network app that has gained immense popularity is a platform that offers real-time chat functionality."
                        />
                        <Paragraph 
                            color={theme.colors.textColor} 
                            text='This social network app allows users to create profiles and connect with friends in real-time. 
                            This feature is particularly useful for staying connected with friends, family, and colleagues, regardless of their physical location.
                            Users can personalize their profiles with photos, bios, and other information to showcase their interests and personality.'
                        />
                        <Paragraph 
                            color={theme.colors.textColor} 
                            text='Start chatting with friends and getting emotions right now! '
                        />
                    </Container>
                    <RegularButton 
                        buttonText='Log in | Sign up' 
                        buttonType='button'
                        onClickHandler={onGoToLogin}
                    />
                    <Image src={startImg}/>
                </PageContainer>
            </Wrapper>
    )
}
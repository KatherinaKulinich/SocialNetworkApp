import { AiFillGithub, AiFillLinkedin } from "react-icons/Ai"
import { SiGmail } from "react-icons/Si"
import { Icon } from '@components/icons/Icon'
import { FooterText } from "../../Footer.styled"
import { Container,  IconsBox, IconLink, Content } from "./Created.styled";







export const Created:React.FC = () => {
    

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
        </Container>
    )
}
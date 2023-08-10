import { Icon } from "@components/icons/Icon"
import { AiOutlineCopyrightCircle } from 'react-icons/Ai'
import { IoIosImages } from 'react-icons/Io'
import { FooterText } from "../../Footer.styled"
import { Container, InfoField } from "./Copyright.styled"


export const Copyright: React.FC = () => {
    return (
        <Container> 
            <InfoField>
                <Icon 
                    icon={<AiOutlineCopyrightCircle/>} 
                    iconColor='#FFFFFF' 
                    iconSize='12px'
                />
                <FooterText>
                    All rights reserved
                </FooterText>
            </InfoField>
            <InfoField>
                <Icon 
                    icon={<IoIosImages/>} 
                    iconColor='#FFFFFF' 
                    iconSize='12px'
                />
                <FooterText>
                    Images by storyset on Freepik
                </FooterText>
            </InfoField>
        </Container>
    )
}
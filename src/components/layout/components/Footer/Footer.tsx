import { Wrapper } from '../Wrapper/Wrapper';
import { FooterSection, FooterContainer, SubContainer } from './Footer.styled';
import { Copyright } from './components/Copyright/Copyright';
import { Created } from './components/Created/Created';
import { ProfileLink } from './components/ProfileLink/ProfileLink';




export const Footer:React.FC = () => {
    return (
        <FooterSection>
            <Wrapper>
                <FooterContainer>
                    <Copyright/>
                    <SubContainer>
                        <Created/>
                        <ProfileLink/>
                    </SubContainer>
                </FooterContainer>
            </Wrapper>
        </FooterSection>
    )
}
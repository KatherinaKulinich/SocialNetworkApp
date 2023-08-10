import { Wrapper } from '../Wrapper/Wrapper';
import { FooterSection, FooterContainer } from './Footer.styled';
import { Copyright } from './components/Copyright/Copyright';
import { Created } from './components/Created/Created';




export const Footer:React.FC = () => {
    return (
        <FooterSection>
            <Wrapper>
                <FooterContainer>
                    <Copyright/>
                    <Created/>
                </FooterContainer>
            </Wrapper>
        </FooterSection>
    )
}
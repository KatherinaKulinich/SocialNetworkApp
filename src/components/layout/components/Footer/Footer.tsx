import { Wrapper } from '../Wrapper/Wrapper';
import { FooterSection, FooterContainer, SubContainer } from './Footer.styled';
import { Copyright } from './components/Copyright/Copyright';
import { Created } from './components/Created/Created';
import { ProfileLink } from './components/ProfileLink/ProfileLink';


interface FooterProps {
    role: 'mainLayout' | 'secondaryLayout'
}

export const Footer:React.FC<FooterProps> = ({role}) => {
    return (
        <FooterSection>
            <Wrapper>
                <FooterContainer>
                    <Copyright/>
                    <SubContainer>
                        <Created/>
                        {role === 'mainLayout' && <ProfileLink/>}
                    </SubContainer>
                </FooterContainer>
            </Wrapper>
        </FooterSection>
    )
}
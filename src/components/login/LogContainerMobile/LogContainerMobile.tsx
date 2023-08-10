import { CardContainer, LoginCard, SignupCard, CardBody, Container, SwitchContainer, Text } from "./LogContainerMobile.styled"
import { LoginFormMobile } from "../components/forms/loginForm/LoginFormMobile";
import { SignUpFormMobile } from "../components/forms/signupForm/SignUpFormMobile";
import { theme } from "@styles/Theme";
import { SecondaryButton } from "@components/buttons/SecondaryButton/SecondaryButton";



interface LogContainerMobileProps {
    login: boolean;
    onToggleCards: () => void;
}


export const LogContainerMobile:React.FC<LogContainerMobileProps> = ({login, onToggleCards}) => {
    
    return (
        <Container>
            <CardContainer>
                <CardBody $login={login}>
                    <LoginCard >
                        <LoginFormMobile/>
                    </LoginCard>
                    <SignupCard>
                        <SignUpFormMobile/>
                    </SignupCard>
                </CardBody>
            </CardContainer>

            <SwitchContainer>
                <Text>
                    {login ? "Don't have an account?" : 'Do you have an account?'}
                </Text>
                <SecondaryButton 
                    buttonColor={theme.colors.regular}  
                    buttonText={login ? 'Sign Up' : 'Log In'}
                    type="button" 
                    onClickHandler={onToggleCards}
                />
            </SwitchContainer>

        </Container>
    )
}
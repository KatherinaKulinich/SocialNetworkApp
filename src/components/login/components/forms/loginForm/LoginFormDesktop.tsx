
import { LoginContainer } from '../Form.styled';
import { LoginFormDefault } from './LoginFormDefault';


interface LoginFormProps {
    login: boolean;
}



export const LoginFormDesktop:React.FC<LoginFormProps> = ({login}) => {
    return (
        <LoginContainer $login={login}>
            <LoginFormDefault/>
        </LoginContainer>
    )
}
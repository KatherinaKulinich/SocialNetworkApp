import { SignUpContainer } from "../Form.styled";
import { SignUpFormDefault } from "./SignUpFormDefault";


interface SignUpFormProps {
    login: boolean;
}


export const SignUpFormDesktop:React.FC<SignUpFormProps> = ({login}) => {

    return (
        <SignUpContainer $login={login}>
            <SignUpFormDefault/>
        </SignUpContainer>
    )
}
import { Form, Input, Title } from "../Form.styled";
import { theme } from '@styles/Theme';
import { SecondaryButton } from '@components/buttons/SecondaryButton/SecondaryButton';



export const SignUpFormDefault:React.FC = () => {
    return (
        <Form>
            <Title>
                Sign Up Form
            </Title>
            <Input 
                placeholder='First name' 
                autoComplete="off"
            />
            <Input 
                placeholder='Last name' 
                autoComplete="off"
            />
            <Input 
                type='email'  
                placeholder='Email' 
                autoComplete="off"
            />
            <Input 
                type='password' 
                placeholder='Password' 
                autoComplete="off"
            />
            <SecondaryButton 
                buttonColor={theme.colors.regular} 
                buttonText={'Sign up'} 
                type="button" 
            />
        </Form>
    )
}
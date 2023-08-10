import { AiOutlineGoogle } from 'react-icons/Ai';
import { Icon } from '@components/icons/Icon';
import { Form, Input, Title, Text, LoginContent } from '../Form.styled';
import { theme } from '@styles/Theme';
import { SecondaryButton } from '@components/buttons/SecondaryButton/SecondaryButton';



export const LoginFormDefault:React.FunctionComponent = () => {
    return (
        <LoginContent>
            <Form>
                <Title>
                    Log In Form
                </Title>
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
                    buttonText={'Log in'} 
                    type="button" 
                />
            </Form>

            <Text>
                or
            </Text>

            <SecondaryButton 
                buttonColor={theme.colors.regular} 
                buttonText={'Log in with'} 
                type="button" 
                icon={
                    <Icon 
                        icon={<AiOutlineGoogle/>} 
                        iconSize='24px' 
                        iconColor={theme.colors.regular}
                    />
                }
            />  
        </LoginContent>
    )
}
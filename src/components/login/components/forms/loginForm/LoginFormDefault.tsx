import { AiOutlineGoogle } from 'react-icons/Ai';
import { Icon } from '@components/icons/Icon';
import { LogForm, Input, Title, Text, LoginContent, FieldContainer, ErrorMessage, InputsList } from '../Form.styled';
import { theme } from '@styles/Theme';
import { SecondaryButton } from '@components/buttons/SecondaryButton/SecondaryButton';
import { useFirebaseAuth } from 'hooks/authorization/useFirebaseAuth';
import { Formik } from 'formik';
import { useValidateLogForm } from 'hooks/useValidateLogForm';



export const LoginFormDefault:React.FunctionComponent = () => {

    const { onLoginByGoogle, onLoginHandler } = useFirebaseAuth()
    const { validateEmail, validatePassword } = useValidateLogForm()


    return (
        <LoginContent>
            <Formik
                initialValues={{ 
                    email: '', 
                    password: ''
                }}
                onSubmit={(values) => {
                    onLoginHandler(values.email, values.password)
                }}
            >
                {({errors, touched, isValidating}) => (
                    <LogForm noValidate>
                        <Title>
                            Log In Form
                        </Title>
                        <InputsList>
                            <FieldContainer>
                                <Input 
                                    type='email'  
                                    placeholder='Email' 
                                    autoComplete="off"
                                    name='email'
                                    validate={validateEmail}
                                />
                                {errors.email && touched.email && (
                                    <ErrorMessage>
                                        {errors.email}
                                    </ErrorMessage>
                                )}
                            </FieldContainer>
                            <FieldContainer>
                                <Input 
                                    type='password' 
                                    placeholder='Password' 
                                    autoComplete="off"
                                    name='password'
                                    validate={validatePassword}
                                />
                                {errors.password && touched.password && (
                                    <ErrorMessage>
                                        {errors.password}
                                    </ErrorMessage>
                                )}
                            </FieldContainer>
                        </InputsList>
                        <SecondaryButton 
                            buttonColor={theme.colors.regular} 
                            buttonText={'Log in'} 
                            type="submit" 
                        />
                    </LogForm>
                )}
            </Formik>

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
                        iconSize='20px' 
                        iconColor={theme.colors.regular}
                    />
                }
                onClickHandler={() => onLoginByGoogle()}
            />  
        </LoginContent>
    )
}
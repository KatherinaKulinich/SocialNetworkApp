import { LogForm, Input, Title, FieldContainer, ErrorMessage } from "../Form.styled";
import { theme } from '@styles/Theme';
import { SecondaryButton } from '@components/buttons/SecondaryButton/SecondaryButton';
import { Formik } from 'formik';
import { useValidateLogForm } from "hooks/useValidateLogForm";
import { useFirebaseAuth } from "hooks/authorization/useFirebaseAuth";



export const SignUpFormDefault:React.FC = () => {
    const { validateName, validateEmail, validatePassword } = useValidateLogForm()
    const { onRegisterHandler } = useFirebaseAuth()

    return (
        <Formik
            initialValues={{ 
                email: '', 
                password: '',
                name: '',
                surname: '',
            }}
            onSubmit={values => {
                onRegisterHandler(values.email, values.password, values.name, values.surname)
            }}
        >
            {({errors, touched, isValidating}) => (
                <LogForm noValidate>
                    <Title>
                        Sign Up Form
                    </Title>
                    <FieldContainer>
                        <Input 
                            placeholder='First name' 
                            autoComplete="off"
                            name='name'
                            validate={validateName}
                        />
                        {errors.email && touched.email && (
                            <ErrorMessage>
                                {errors.name}
                            </ErrorMessage>
                        )}
                    </FieldContainer>
                    <FieldContainer>
                        <Input 
                            placeholder='Last name' 
                            autoComplete="off"
                            name='surname'
                            validate={validateName}
                        />
                        {errors.email && touched.email && (
                            <ErrorMessage>
                                {errors.surname}
                            </ErrorMessage>
                        )}
                    </FieldContainer>
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
                                {errors.password}
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
                    </FieldContainer>
                    <SecondaryButton 
                        buttonColor={theme.colors.regular} 
                        buttonText={'Sign up'} 
                        type="submit" 
                    />
                </LogForm>
            )}
        </Formik>
    )
}
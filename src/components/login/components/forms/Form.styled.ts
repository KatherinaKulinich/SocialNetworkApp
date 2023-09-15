import styled from 'styled-components';
import { theme } from '@styles/Theme';
import { FlexCenter, FullSize, Font, Column } from '@styles/mixins';
import { Field, Form } from 'formik';


export interface FormContainerProps {
    $login: boolean;
}


export const LoginContainer = styled.div<FormContainerProps>`
    position: absolute;
    padding: 20px;
    top: 0;
    left: 0;
    height: 100%;
    width: 50%;
    transition: all 0.6s ease-in-out;
    z-index: 2;
    ${props => (props.$login !== true ? `transform: translateX(100%); opacity: 0; z-index: 1;` : null)};
    border-right: 2px solid ${theme.colors.regular};
    background-color: #fbfbfb;
    /* background-color: #f7f7f7; */
`;

export const ContainerMobile = styled.div`
    padding: 30px;
    ${FullSize};
`


export const SignUpContainer = styled.div<FormContainerProps>`
    padding: 20px;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 50%;
    transition: all 0.6s ease-in-out;
    opacity: 0;
    z-index: 1;
    border-left: 2px solid ${theme.colors.regular};
    background-color: #f7f7f7;
    ${props => props.$login !== true ? `
        transform: translateX(100%);
        opacity: 1;
        z-index: 5;
    ` 
    : null};

`;

export const LoginContent = styled.div`
    height: 100%;
    ${FlexCenter};
    flex-direction: column;
    gap: 10px;
`;

export const LogForm = styled(Form)`
    width: 100%;
    ${FlexCenter};
    flex-direction: column;
    gap: 20px;
    text-align: center;
`;

export const Title = styled.h1`
    ${Font({size: '22px', line: '26px', color: theme.colors.regularDark})};
    text-transform: uppercase;
`;

export const Input = styled(Field)`
    padding: 12px 15px;
    width: 100%;
    background-color: ${theme.colors.lightGray};
    border: none;
    border-radius: 7px;
    outline-color: ${theme.colors.regularLight};
`;

export const Button = styled.button`
    padding: 12px 45px;
    border-radius: 20px;
    border: 1px solid #ff4b2b;
    background-color: #ff4b2b;
    ${Font({size: '12px', weight: '600', line: '15px', color: theme.colors.white})};
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: transform 80ms ease-in;

    &:active{
        transform: scale(0.95);
    }
    &:focus {
        outline: none;
    }
`;

export const Text = styled.p`
    ${Font({size: '12px', line: '15px', color: theme.colors.textColor})};
`

export const ErrorMessage = styled.p`
    ${Font({size: '10px', line: '12px', color: theme.colors.regular})};
`

export const FieldContainer = styled.div`
    width: 100%;
    ${Column};
    gap: 5px;
`
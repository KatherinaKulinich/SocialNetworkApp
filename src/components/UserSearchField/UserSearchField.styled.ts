import { styled } from "styled-components";
import { theme } from "../../styles/Theme";
import { BoxShadow } from "../../styles/mixins";
import { TextField } from "@mui/material";


export const Field = styled.div`
    padding: 12px 20px 20px 20px;
    border-radius: 50px;
    width: 100%;
    max-width: 500px;
    background-color: #f1f1f1;
    ${BoxShadow};
    align-self: center;
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: 20px;
    margin-bottom: 40px;
`

export const FormButton = styled.button`
    border:none;
    outline: none;
    background-color: transparent;
    width: 50px;
    height:50px;
    padding: 12px;
    border-radius: 50%;

    &:hover {
        background-color: rgba(188, 188, 188, .3);
    }
`

export const InputField = styled(TextField)`
    & label.Mui-focused {
        color: ${theme.colors.regularDark};
    }

    & .css-l4u8b9-MuiInputBase-root-MuiInput-root::after {
        border-bottom: 1px solid #969696;

        &::after {
            border-bottom: 1px solid ${theme.colors.regular};
        }
    }
`;
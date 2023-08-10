import { theme } from "@styles/Theme";
import { Column } from "@styles/mixins";
import { styled } from "styled-components";


export const Form = styled.form`
    width: 100%;
    padding: 30px;
    ${Column};
    gap: 20px;
`

export const TextField = styled.textarea`
    resize: none;
    width: 100%;
    border: 1px solid ${theme.colors.lightGray};
    min-height: 120px;
    padding: 10px;
    border-radius: 7px;
`

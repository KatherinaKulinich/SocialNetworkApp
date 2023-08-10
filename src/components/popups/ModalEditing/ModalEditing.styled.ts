import { theme } from "@styles/Theme";
import { Column } from "@styles/mixins";
import { styled } from "styled-components";



export const Container = styled.div`
    width: 100%;
    ${Column};
    gap: 30px;
`


export const TextField = styled.textarea`
    resize: none;
    width: 100%;
    border: 1px solid ${theme.colors.lightGray};
    min-height: 120px;
    padding: 10px;
    border-radius: 7px;
`
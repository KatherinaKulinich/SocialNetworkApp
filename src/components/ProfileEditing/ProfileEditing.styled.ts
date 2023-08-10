import { Column, Font } from "@styles/mixins";
import { styled } from "styled-components";
import { theme } from "@styles/Theme";

export const Container = styled.div`
    width:100%;
    ${Column};
    gap: 30px;
    text-align: center;
`

export const FormTitle = styled.p`
    ${Font({size: '16px', line: '20px', color: theme.colors.regular})};
    text-transform: uppercase;
`



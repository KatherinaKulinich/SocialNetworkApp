import { styled } from "styled-components";
import { theme } from "../../../../../styles/Theme";

export const Field = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`

export const Subtitle = styled.p`
    text-transform: uppercase;
    font-size: 14px;
    line-height: 16px;
    color:  ${theme.colors.textColor};
    font-weight: 500;
    display:flex;
    align-items: center;
    gap: 12px;
`

export const RegularText = styled(Subtitle)`
    font-weight: 300;
`
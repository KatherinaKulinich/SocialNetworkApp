import { styled } from "styled-components";
import { Font } from "@styles/mixins";
import { theme } from "@styles/Theme";
import { device } from "@styles/Breakpoints";


export const FilterField = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`


export const Label = styled.p`
    ${Font({size: '12px', line: '15px', color: theme.colors.regularDark})};
    text-transform: uppercase;

    @media ${device.sm} {
        font-size: 16px;
        line-height: 19px;
    };
`

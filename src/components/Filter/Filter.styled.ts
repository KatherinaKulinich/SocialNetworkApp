import { styled } from "styled-components";
import { Font } from "@styles/mixins";
import { theme } from "@styles/Theme";
import { Select } from "antd";


export const FilterField = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`


export const Label = styled.p`
    ${Font({size: '18px', line: '21px', color: theme.colors.regularDark})};
    text-transform: uppercase;
`

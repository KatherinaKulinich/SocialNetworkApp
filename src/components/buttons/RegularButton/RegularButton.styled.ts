import styled from 'styled-components';
import { BoxShadow, Font } from '@styles/mixins';
import { device } from "@styles/Breakpoints";
import { theme } from "@styles/Theme"


export const Button = styled.button`
    padding: 7px 18px;
    border: 1px solid #EEEEEE;
    border-radius: 20px;
    background-color: #CB3F47;
    cursor: pointer;
    align-self: center;
    display: flex;
    align-items: center;
    gap: 10px;
    ${BoxShadow}
    ${Font({size: '12px', line: '15px', color: theme.colors.white})};

    &:hover {
        background-color:#d05259;
    }

    @media ${device.sm} {
        padding: 10px 25px;
        border-radius: 25px;
        font-size: 14px;
        line-height: 17px;
    };

`
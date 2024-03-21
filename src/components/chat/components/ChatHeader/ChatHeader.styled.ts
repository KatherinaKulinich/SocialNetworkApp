import { styled } from "styled-components";
import { theme } from "@styles/Theme";
import { Font } from "@styles/mixins";
import { Link } from "react-router-dom";
import { device } from "@styles/Breakpoints";


export const Container = styled.div`
    width: 100%;
    padding: 3px 10px;
    background-color: #FFFFFF;
    border-bottom: 1px solid ${theme.colors.lightGray};
    display: flex;
    align-items: center;
    justify-content:space-between;
    /* gap: 100px; */
    cursor: pointer;

    @media ${device.sm} {
        padding: 7px 30px;
    };
`

export const UserInfo = styled(Link)`
    display: flex;
    align-items: center;
    gap: 7px;
    text-decoration: none;

    @media ${device.sm} {
        gap: 15px;
    };
`

export const Name = styled.p`
    ${Font({size: '8px',weight: '500', line: '10px', color: theme.colors.regularDark})};
    text-transform: uppercase;

    @media ${device.sm} {
        font-size: 14px;
        line-height: 17px;
    };
`
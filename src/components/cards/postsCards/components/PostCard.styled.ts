import { theme } from "@styles/Theme";
import { BoxShadow, Column } from "@styles/mixins";
import { styled } from "styled-components";
import { device } from "@styles/Breakpoints";


export const CardContainer = styled.div`
    padding: 12px;
    width: 100%;
    max-width: 600px;
    border: 1px solid ${theme.colors.regularLight};
    border-radius: 10px;
    ${BoxShadow};
    ${Column};
    align-items: center;
    background-color: #ffffff;

    @media ${device.sm} {
        padding: 25px;
        border-radius: 15px;
    };
`

export const CardHeader = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 10px;
    border-bottom: 1px solid ${theme.colors.lightGray};

    @media ${device.sm} {
        padding-bottom: 15px;
    };
`

export const CardFooter = styled.div`
    width:100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 10px;
    border-top: 1px solid ${theme.colors.lightGray};

    @media ${device.sm} {
        padding-top: 15px;
    };
`

export const  MainContent = styled.div`
    width: 100%;
`


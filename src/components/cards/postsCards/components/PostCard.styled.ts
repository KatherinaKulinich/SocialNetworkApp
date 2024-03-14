import { theme } from "@styles/Theme";
import { BoxShadow, Column } from "@styles/mixins";
import { styled } from "styled-components";
import { device } from "@styles/Breakpoints";


export const CardContainer = styled.div`
    padding: 10px;
    width: 100%;
    max-width: 600px;
    border: 1px solid ${theme.colors.regularLight};
    border-radius: 15px;
    ${BoxShadow};
    ${Column};
    align-items: center;
    background-color: #ffffff;

    @media ${device.sm} {
        padding: 25px;
    };
`

export const CardHeader = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 15px;
    border-bottom: 1px solid ${theme.colors.lightGray};
`

export const CardFooter = styled.div`
    width:100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 15px;
    border-top: 1px solid ${theme.colors.lightGray};
`

export const  MainContent = styled.div`
    width: 100%;
`


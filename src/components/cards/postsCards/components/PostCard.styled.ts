import { theme } from "@styles/Theme";
import { BoxShadow, Column, Font } from "@styles/mixins";
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
    gap: 10px;
    align-items: center;

    @media ${device.sm} {
        padding: 25px;
        gap: 20px;
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

// export const UserData = styled.div`
//     display: flex;
//     align-items: center;
//     gap: 5px;
// `
// export const Date = styled.div`
//     display: flex;
//     flex-direction: column;
//     gap: 3px;
//     align-items: end;
// `

// export const Text = styled.p`
//     ${Font({size: '12px', line: '16px', color: theme.colors.mediumGray})};
// `

// export const PostTime = styled(Text)`
//     font-size: 9px;
// `


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
    padding: 7px;

`


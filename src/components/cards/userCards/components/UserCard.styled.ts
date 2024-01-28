import { styled } from "styled-components";
import { BoxShadow, Column, FlexCenter, Font, Size } from "@styles/mixins";
import { theme } from "@styles/Theme";
import { device } from "@styles/Breakpoints";




export const Card = styled.div`
    padding: 12px;
    width: 150px;
    border-radius: 10px;
    background-color: ${theme.colors.lightGray};
    ${Column};
    justify-content: space-between;
    align-items:center;
    gap: 20px;
    ${BoxShadow};
    height:initial;
    cursor: pointer;

    @media ${device.sm} {
        width: 200px;
        padding: 15px;
        border-radius: 15px;
    };
    @media ${device.xl} {
        width: 220px;
    };
`


export const ActionsContainer = styled.div`
    width: 100%;
    display: flex;
    align-items:center;
    justify-content: center;
    gap: 7px;
`


export const Name = styled.h3`
    ${Font({size: '13px', line: '16px', color: theme.colors.regularDark})};
    text-transform: uppercase;

    @media ${device.sm} {
        font-size: 16px;
        line-height: 19px;
    };
`

export const PersonalInfo = styled.div`
    ${Column};
    gap: 5px;
    text-align: center;
`

export const Text = styled.p`
    ${Font({size: '11px', line: '14px', color: theme.colors.mediumGray})};
    text-transform: uppercase;

    @media ${device.sm} {
        font-size: 13px;
        line-height: 15px;
    };
`

// export const CardButton = styled.button<{bg: string, color: string}>`
//     ${Font({size: '15px', line: '17px', color: theme.colors.regularDark})};
//     text-transform: uppercase;
//     border-radius: 7px;
//     background-color: 'FFFFFF';

//         &:hover {
//             color: ${theme.colors.regular};
//         }
// `
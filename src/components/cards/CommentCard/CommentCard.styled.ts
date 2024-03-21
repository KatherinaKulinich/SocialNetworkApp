import { styled, keyframes } from "styled-components";
import { theme } from "@styles/Theme";
import { device } from "@styles/Breakpoints";
import { Font } from "@styles/mixins";


const lastCommentAnimation = keyframes`
    0% {background-color: ${theme.colors.regularLight}}
    100% {background-color: rgba(220, 220, 220, .2)}
`


export const Card = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 30px;
    padding: 5px;
    border-radius: 3px;
    background-color: rgba(220, 220, 220, .2);

    &:last-child {
        animation-name: ${lastCommentAnimation};
        animation-duration: 1s
    }

    @media ${device.sm} {
        padding: 8px;
        border-radius: 5px;
    };
`
const Text = styled.p`
    ${Font({size: '8px', line: '12px', color: theme.colors.textColor})};

    @media ${device.sm} {
        font-size: 10px;
        line-height: 13px;
    };
`

export const Name = styled(Text)`
    color: ${theme.colors.regularDark};
    text-transform: uppercase;
`
export const Comment = styled(Text)`
    color: ${theme.colors.darkGray};
`

export const Time = styled(Name)`
    color: ${theme.colors.mediumGray};
    font-size: 7px;
`


export const MainInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`

export const TextField = styled.div`
    display:flex;
    flex-direction: column;
    align-items: start;
    gap: 7px;
`

export const TimeField = styled(TextField)`
    align-items: end;
    gap: 0;
`
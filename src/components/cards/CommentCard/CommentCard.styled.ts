import { Font } from "@styles/mixins";
import { theme } from "@styles/Theme";
import { styled, keyframes } from "styled-components";

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
    padding: 8px;
    border-radius: 5px;
    background-color: rgba(220, 220, 220, .2);

    &:last-child {
        animation-name: ${lastCommentAnimation};
        animation-duration: 1s
    }
`

export const Name = styled.p`
    ${Font({size: '10px', line: '13px', color: theme.colors.regularDark})};
    text-transform: uppercase;
`
export const Comment = styled.p`
    ${Font({size: '10px', line: '13px', color: theme.colors.darkGray})};
`

export const Time = styled(Name)`
    color: ${theme.colors.mediumGray};
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
    gap: 5px;
`

export const TimeField = styled(TextField)`
    align-items: end;
`
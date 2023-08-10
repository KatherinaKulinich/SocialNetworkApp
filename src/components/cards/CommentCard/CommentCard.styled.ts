import { Font } from "@styles/mixins";
import { theme } from "@styles/Theme";
import { styled } from "styled-components";


export const Card = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 30px;
    padding: 8px;
    border-radius: 5px;
    background-color: rgba(220, 220, 220, .2);
`

export const Name = styled.p`
    ${Font({size: '12px', line: '13px', color: theme.colors.mediumGray})};
    text-transform: uppercase;
`
export const Comment = styled.p`
    ${Font({size: '10px', line: '13px', color: theme.colors.darkGray})};
`

export const Time = styled(Name)`
    color: ${theme.colors.lightGray};
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
import { styled } from "styled-components";
import { device } from "@styles/Breakpoints";


export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 3px;

    @media ${device.sm}  {
        gap: 7px;
    }
`

export const InfoField = styled(Container)`
    flex-direction: row;
    align-items: center;
`
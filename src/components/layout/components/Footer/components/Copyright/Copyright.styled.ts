import { styled } from "styled-components";


export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 7px;
`

export const InfoField = styled(Container)`
    flex-direction: row;
    align-items: center;
`
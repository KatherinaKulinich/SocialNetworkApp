import { styled } from "styled-components";
import { device } from "@styles/Breakpoints";
import { FullSize } from "@styles/mixins";



export const DrawerContainer = styled.div`
    ${FullSize};
    padding: 8px 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;


    @media ${device.sm} {
        padding: 20px 16px;
    };
`

export const SubContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px 0;
`

export const LoginContainer = styled(SubContainer)`
    align-items: end;
    gap: 9px;

    @media ${device.sm} {
        gap: 14px;
    };
`

export const DrawerFooter = styled.div`
    width: 100%;
    padding-top: 10px;
    border-top: 1px solid #FFF;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 2fr 1fr;
    gap:6px;

    @media ${device.sm} {
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: auto;
        gap:12px;
    };
`

export const Image = styled.img`
    display: none;


    @media ${device.sm} {
        display: block;
        align-self: center;
        width: 250px;
        height: 300px;
    };
`

export const Links = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;

    @media ${device.sm} {
        gap: 20px;
    };
`

export const GridItem = styled.div<{$columnXS?: string, $rowXS?: string, $columnSM?: string, $rowSM?: string}>`
    grid-column: ${props => props.$columnXS};
    grid-row: ${props => props.$rowXS};
    ${FullSize};

    @media ${device.sm} {
        grid-column: ${props => props.$columnSM};
        grid-row: ${props => props.$rowSM};
    };
`
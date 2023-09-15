import { styled } from "styled-components";
import { device } from "@styles/Breakpoints";
import { FullSize } from "@styles/mixins";



export const DrawerContainer = styled.div`
    ${FullSize};
    padding: 20px 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

export const SubContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 40px;
`

export const LoginContainer = styled(SubContainer)`
    align-items: end;
    gap: 14px;
`

export const DrawerFooter = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 12px;
    border-top: 1px solid #FFF;

    @media ${device.sm} {
        padding-top: 20px;
    };
`

export const Image = styled.img`
    display: none;
    /* width: 160px;
    height: 200px; */
    

    @media ${device.sm} {
        display: block;
        align-self: center;
        width: 300px;
        height: 350px;
    };
`

export const Links = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`
import { styled } from "styled-components";
import { device } from "@styles/Breakpoints";
import { FullSize } from "@styles/mixins";



export const DrawerContainer = styled.div`
    ${FullSize};
    padding: 30px 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

export const SubContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 50px;
`

export const LoginContainer = styled(SubContainer)`
    align-items: end;
    gap: 20px;
`

export const DrawerFooter = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 20px;
    border-top: 1px solid #FFF;
`

export const Image = styled.img`
    width: 160px;
    height: 200px;
    align-self: center;

    @media ${device.sm} {
        width: 360px;
        height: 400px;
    };
`

export const Links = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`
import { AbsoluteCenter, FlexCenter, FullSize, Font } from "@styles/mixins";
import { styled } from "styled-components";
import { theme } from "@styles/Theme";

 

export const CardContainer = styled.div`
    perspective:2000px;
    border-radius: 10px;
    width: 95%;
    max-width: 600px;
    height: 370px;
    background-color: transparent;  
    
`

export const CardBody = styled.div<{$login: boolean}>`
    transform-style: preserve-3d;
    position: relative;
    transition:all .5s ease;
    ${FullSize};
    z-index: 5;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    ${props => (props.$login === true ? `transform: rotateY(0);` : `transform: rotateY(-180deg);`)};
`

export const Side = styled.div`
    ${FullSize};
    background-color: #fff;
    border-radius: 10px;
    position:absolute;
    top: 0;
    left: 0;
    ${FlexCenter};
    backface-visibility: hidden;
`

export const LoginCard = styled(Side)`
    ${FullSize};
    position: relative;
    border-radius: 10px;
    z-index: 2;
`

export const SignupCard = styled(Side)`
    ${FullSize};
    border-radius: 10px;
    transform: rotateY(180deg);
    z-index: 1;
`

export const Container = styled.div`
    ${FullSize};
    ${FlexCenter};
    flex-direction: column;
    gap: 30px;
    position: absolute;
    ${AbsoluteCenter};
`

export const SwitchContainer = styled.div`
    ${FlexCenter};
    flex-direction: column;
    gap: 10px;
`

export const Text = styled.p`
    ${Font({size: '12px', line: '16px', color: theme.colors.darkGray})};
`
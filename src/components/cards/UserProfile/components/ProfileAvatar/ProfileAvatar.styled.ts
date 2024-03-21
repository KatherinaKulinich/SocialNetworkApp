import { styled } from "styled-components";
import { theme } from "@styles/Theme";
import { AbsoluteCenter } from "@styles/mixins";

export const Avatar = styled.div`
    width: 160px;
    height: 160px;
    object-fit: cover;
    border-radius: 50%;
    border: 3px solid ${theme.colors.regular};
    z-index: 50;
    ${AbsoluteCenter};
    overflow:hidden;
`

export const Blob = styled.img`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    &:nth-child(1) {
        z-index: 10;
        width: 230px;
        height: 230px;
    }
    &:nth-child(2) {
        z-index: 20;
        width: 250px;
        height: 250px;
    }
    &:nth-child(3) {
        z-index: 30;
        width: 240px;
        height: 240px;
    }
    &:nth-child(4) {
        z-index: 40;
        width: 250px;
        height: 250px;
    }
`

export const AvatarBox = styled.div`
    width: 250px;
    height: 250px;
    position: relative; 
`

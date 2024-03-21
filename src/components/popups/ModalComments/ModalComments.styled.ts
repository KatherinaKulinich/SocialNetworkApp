import { theme } from "@styles/Theme";
import { Column, Font } from "@styles/mixins";
import { keyframes, styled } from "styled-components";
import { device } from "@styles/Breakpoints";

export const Container = styled.div`
    ${Column};
    width: 100%;
    position: relative; 
`

export const PhotoContent = styled.div`
    width: 100%;
    padding: 12px 5px;
    display: flex;
    align-items: center;
    gap: 10px;
    border-bottom: 1px solid ${theme.colors.lightGray};

    @media ${device.sm} {
        padding: 30px 10px;
        gap: 20px;
    };
`

export const PhotoField = styled.img`
    width: 70px;
    height: 70px;
    border-radius: 5px;
    object-fit: cover;

    @media ${device.sm} {
        width: 100px;
        height: 100px;
    };
`

export const Text = styled.p`
    ${Font({size: '10px', line: '13px', color: theme.colors.darkGray})};
    text-align: left;
`

const lastCommentAnimation = keyframes`
    0% {background-color: ${theme.colors.regularLight}}
    100% {background-color: rgba(220, 220, 220, .2)}
`

export const CommentsBox = styled.div`
    padding: 10px 5px;
    width: 100%;
    ${Column};
    gap: 7px;
    height: min(270px, 270px);
    overflow-y: auto;
   

    &:last-child {
        background-color:red;
        animation-name: ${lastCommentAnimation};
        animation-duration: 0.5s
    }

    @media ${device.sm} {
        padding: 20px;
        gap: 10px;
    };
`




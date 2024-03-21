import { styled } from "styled-components";
import { BoxShadow, Column, FullSize, Font, FlexCenter } from "@styles/mixins";
import { theme } from "@styles/Theme";
import { Image } from "antd";
import { device } from "@styles/Breakpoints";


export const Card = styled.div`
    padding: 15px;
    width:100%;
    max-width: 300px;
    min-height: 400px;
    ${BoxShadow};
    ${Column};
    gap: 8px; 
    background-color: #ffffff;

    @media ${device.lg} {
        min-height: 450px;
    };
`

export const CardImage = styled(Image)`
    object-fit: cover;
    width: 260px;
    height: 260px;
    max-width: 260px;
    min-width: 260px;
    max-height: 260px;
    min-height:260px;
`

export const Content = styled.div`
    ${FullSize};
    ${Column};
    justify-content: space-between;
    gap: 20px;
    text-align: center;
    position: relative;

    @media ${device.sm} {
        gap: 30px;
    };
`

export const PhotoDescription = styled.p`
    ${Font({size: '12px', weight: '500', line: '14px', color: theme.colors.regularDark})};
    word-wrap: wrap;
    max-height: 75px;
    max-width: 260px;
    overflow: hidden;

    @media ${device.sm} {
        font-size: 14px;
        line-height: 17px;
    };
`

export const Actions = styled.div`
    width: 100%;
    display:flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
`


export const Action = styled.div`
    display:flex;
    align-items: center;
    gap: 8px;
`

export const Comments = styled.button`
    border: none;
    outline: none;
    background-color: transparent;
    ${Font({size: '12px', line: '15px', color: theme.colors.regular})};
    text-transform: uppercase;

    @media ${device.sm} {
        font-size: 14px;
        line-height: 17px;
    };
`

export const Text = styled.p`
    ${Font({size: '12px', line: '15px', color: theme.colors.mediumGray})};
    text-transform: uppercase;

    @media ${device.sm} {
        font-size: 14px;
        line-height: 17px;
    };
`

export const DateText = styled(Text)`
    font-size: 8px;
    line-height: 11px;

    @media ${device.sm} {
        font-size: 10px;
        line-height: 13px;
    };
`

export const Separator = styled.div`
    width:100%;
    height: 1px;
    background-color: #dadddb;
`

export const LikeBox = styled.div`
    ${FlexCenter};
    width: 40px;
    height: 40px;
    position: relative;
    z-index: 10;
`
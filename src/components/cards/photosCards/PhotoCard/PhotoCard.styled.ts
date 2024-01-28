import { styled } from "styled-components";
import { BoxShadow, Column, FullSize, Font } from "@styles/mixins";
import { theme } from "@styles/Theme";
import { Image } from "antd";


export const Card = styled.div`
    padding: 20px;
    width: 300px;
    min-height: 450px;
    ${BoxShadow};
    ${Column};
    gap: 8px; 
    background-color: #ffffff;
`

export const CardImage = styled(Image)`
    object-fit: cover;
    min-width: 260px;
    min-height: 260px;
    width: 260px;
    height: 260px;
    max-width: 260px;
    max-height: 260px;
`

export const Content = styled.div`
    ${FullSize};
    ${Column};
    justify-content: space-between;
    gap: 30px;
    text-align: center;
`

export const PhotoDescription = styled.p`
    ${Font({size: '14px', weight: '500', line: '16px', color: theme.colors.regularDark})};
    word-wrap: wrap;
    max-height: 75px;
    max-width: 260px;
    overflow: hidden;
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
    color: ${theme.colors.regular};
    text-transform: uppercase;
`

export const Text = styled.p`
    ${Font({size: '16px', line: '19px', color: theme.colors.mediumGray})};
    text-transform: uppercase;
`

export const DateText = styled(Text)`
    font-size: 10px;
`

export const Separator = styled.div`
    width:100%;
    height: 1px;
    background-color: #dadddb;
`
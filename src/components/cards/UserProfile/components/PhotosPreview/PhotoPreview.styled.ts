import { styled } from "styled-components";
import { BoxShadow } from "@styles/mixins";
import { theme } from "@styles/Theme";


export const PhotosBox = styled.div`
    width: 220px;
    height: 220px;
    display:flex;
    flex-wrap:wrap;
    gap: 3px;
    align-items:center;
    ${BoxShadow};
    background-color: ${theme.colors.lightGray};
    cursor: pointer;
`

export const PhotoSrc = styled.img`
    width: 70px;
    height: 70px;
    object-fit: cover;
`
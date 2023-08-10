import { styled } from "styled-components";
import { BoxShadow } from "../../../../../styles/mixins";


export const PhotosBox = styled.div`
    width: 220px;
    height: 220px;
    display:flex;
    flex-wrap:wrap;
    gap:3px;
    align-items:center;
    ${BoxShadow};
`

export const Photo = styled.img`
    width: 70px;
    height: 70px;
    object-fit: cover;

`
import { styled } from "styled-components";


interface AvatarImageProps {
    border: string;
    size: string;
}


export const AvatarImage = styled.img<AvatarImageProps>`
    object-fit: cover;
    width: ${props => props.size };
    height: ${props => props.size};
    border: 1px solid ${props => props.border};
    border-radius: 50px;
`
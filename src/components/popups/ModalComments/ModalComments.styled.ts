import { theme } from "@styles/Theme";
import { Column, Font } from "@styles/mixins";
import { styled } from "styled-components";

export const Container = styled.div`
    ${Column};
    /* gap: 30px; */
    width: 100%;
`

export const PhotoContent = styled.div`
    width: 100%;
    padding: 30px;
    display: flex;
    align-items: center;
    /* justify-content: center; */
    gap: 20px;
    /* padding-bottom: 10px; */
    border-bottom: 1px solid ${theme.colors.lightGray};
`

export const Photo = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 5px;
    object-fit: cover;
`

export const Text = styled.p`
    ${Font({size: '10px', line: '13px', color: theme.colors.darkGray})};
    text-align: left;
`

export const CommentsBox = styled.div`
    padding: 20px;
    width: 100%;
    ${Column};
    gap: 10px;
    height: min(220px, 220px);
    overflow-y: auto;
`
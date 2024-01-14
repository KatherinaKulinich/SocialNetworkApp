import styled from "styled-components";



export const PreviewContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items:center;
    gap: 30px;
    margin-right: auto;
    margin-left: auto;
`


export const PostsContainer = styled(PreviewContainer)`
    flex-direction: column-reverse;
    gap: 20px;
`
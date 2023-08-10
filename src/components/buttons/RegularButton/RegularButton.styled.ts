import styled from 'styled-components';
import { BoxShadow } from '@styles/mixins';


export const Button = styled.button`
    padding: 10px 25px;
    border: 1px solid #EEEEEE;
    border-radius: 25px;
    background-color: #CB3F47;
    color: #FFFFFF;
    cursor: pointer;
    align-self: center;
    display: flex;
    align-items: center;
    gap: 10px;
    ${BoxShadow}

    &:hover {
        background-color:#d05259;
    }

`
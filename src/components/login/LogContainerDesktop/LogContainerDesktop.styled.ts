import { AbsoluteCenter } from '@styles/mixins';
import styled from 'styled-components';

export const Container = styled.div`
    width: 800px;
    max-width: 100%;
    min-height: 500px;
    background-color: #f7f7f7;
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    overflow: hidden;
    ${AbsoluteCenter};
`;
import styled from 'styled-components';
import {FormContainerProps} from '../forms/Form.styled'
import { theme } from '@styles/Theme';
import { Column, Font } from '@styles/mixins';



export const OverlayContainer = styled.div<FormContainerProps>`
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: transform 0.6s ease-in-out;
    z-index: 100;
    ${props => props.$login !== true ? `transform: translateX(-100%);` : null}
`;

export const Overlay = styled.div<FormContainerProps>`
    background: ${theme.colors.regular};
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 0 0;
    color: #ffffff;
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
    ${props => (props.$login !== true ? `transform: translateX(50%);` : null)};
`;

export const OverlayPanel = styled.div<FormContainerProps>`
    position: absolute;
    ${Column};
    ${props => props.$login !== true ? `justify-content: end` : `justify-content: start`};
    gap: 20px;
    padding: 40px;
    text-align: center;
    top: 0;
    height: 100%;
    width: 50%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
`;

export const LeftOverlayPanel = styled(OverlayPanel)<FormContainerProps>`
    transform: translateX(-20%);
    ${props => props.$login !== true ? `transform: translateX(0);` : null};
`;

export const RightOverlayPanel = styled(OverlayPanel)<FormContainerProps>`
    right: 0;
    transform: translateX(0);
    ${props => props.$login !== true ? `transform: translateX(20%);` : null};
`;

export const ImageBox = styled.div<FormContainerProps>`
    position: absolute;
    ${props => props.$login === true ? `bottom: -190px` : `top: -190px`};
    left: 50%;
    transform: translateX(-50%);
    width: 550px;
    height: 550px;
    background-color: #FFFFFF;
    border-radius: 50%;
`

export const Image = styled.img<FormContainerProps>`
    width: 260px;
    height: 310px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    ${props => props.$login === true ? `top: 20px` : `bottom: 20px`};
`

export const Text = styled.p`
    ${Font({size: '19px', line: '21px', color: theme.colors.regularDark})};
    text-transform: uppercase;
`

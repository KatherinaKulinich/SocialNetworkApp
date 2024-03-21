import styled from 'styled-components';
import { theme } from '@styles/Theme';
import { device } from '@styles/Breakpoints';



interface TitleProps {
    text:string;
    color?: string;
}

export const Title:React.FC<TitleProps> = ({text, color}) => {
    return (
        <TitleText $color={color}>
            {text}
        </TitleText>
    )
}



const TitleText = styled.h1<{$color?: string}>`
    text-transform: uppercase;
    font-size: 13px;
    line-height: 17px;
    color: ${props => props.$color ?  props.$color : theme.colors.regular};
    letter-spacing: 1px;

    @media ${device.sm} {
        font-size: 16px;
        line-height: 20px;
    };

    @media ${device.xl} {
        font-size: 20px;
        line-height: 26px;
    };
`
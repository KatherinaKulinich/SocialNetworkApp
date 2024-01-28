import styled from 'styled-components';
import { theme } from '@styles/Theme';
import { device } from '@styles/Breakpoints';



interface SubTitleProps {
    text:string;
    color?: string
}

export const SubTitle:React.FC<SubTitleProps> = ({text, color}) => {
    return (
        <SubTitleText $color={color}>
            {text}
        </SubTitleText>
    )
}


const SubTitleText = styled.h1<{$color?: string}>`
    text-transform: uppercase;
    font-size: 12px;
    line-height: 17px;
    font-weight: 400;
    color: ${props => props.$color ?  props.$color : theme.colors.regular};
    letter-spacing: 1px;
    text-align: center;

    @media ${device.sm} {
        font-size: 16px;
        line-height: 21px;
    };
    
    @media ${device.xl} {
        font-size: 20px;
        line-height: 26px;
    };
`
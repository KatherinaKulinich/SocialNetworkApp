import styled from 'styled-components';
import { theme } from '@styles/Theme';
import { device } from '@styles/Breakpoints';



interface SubTitleProps {
    text:string
}

export const SubTitle:React.FC<SubTitleProps> = ({text}) => {
    return (
        <SubTitleText>
            {text}
        </SubTitleText>
    )
}



const SubTitleText = styled.h1`
    text-transform: uppercase;
    font-size: 16px;
    line-height: 19px;
    font-weight: 400;
    color: ${theme.colors.regular};
    letter-spacing: 1px;

    @media ${device.sm} {
        font-size: 20px;
        line-height: 24px;
    };
    
    @media ${device.xl} {
        font-size: 24px;
        line-height: 28px;
    };
`
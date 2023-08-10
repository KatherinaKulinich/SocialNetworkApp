import styled from 'styled-components';
import { theme } from '@styles/Theme';
import { device } from '@styles/Breakpoints';



interface TitleProps {
    text:string
}

export const Title:React.FC<TitleProps> = ({text}) => {
    return (
        <TitleText>
            {text}
        </TitleText>
    )
}



const TitleText = styled.h1`
    text-transform: uppercase;
    font-size: 20px;
    line-height: 25px;
    color: ${theme.colors.regular};
    letter-spacing: 1px;

    @media ${device.sm} {
        font-size: 25px;
        line-height: 30px;
    };

    @media ${device.xl} {
        font-size: 35px;
        line-height: 40px;
    };
`
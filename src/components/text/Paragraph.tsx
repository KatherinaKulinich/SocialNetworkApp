import styled from 'styled-components';



interface ParagraphProps {
    text: string;
    color: string;
}

export const Paragraph:React.FC<ParagraphProps> = ({text, color}) => {
    return (
        <Text $color={color}>
            {text}
        </Text>
    )
}




const Text = styled.p<{$color: string}>`
    font-size: 11px;
    line-height: 14px;
    color: ${props => props.$color};
`

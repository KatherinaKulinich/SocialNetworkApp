import styled from "styled-components";
import { Icon } from "./Icon";

interface IconOutlinedProps {
    icon: React.ReactNode;
    iconColor: string;
    iconSize: string;
}


const IconBox = styled.div<{$iconColor: string}>`
    padding: 5px;
    border: 1px solid ${props => props.$iconColor};
    border-radius: 50%;
`


export const IconOutlined:React.FC<IconOutlinedProps> = ({icon, iconColor, iconSize}) => {
    return (
        <IconBox $iconColor={iconColor}>
            <Icon 
                icon={icon} 
                iconColor={iconColor} 
                iconSize={iconSize}
            />
        </IconBox>
    )
}
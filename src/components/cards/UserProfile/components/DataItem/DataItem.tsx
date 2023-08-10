import { theme } from "../../../../../styles/Theme";
import { Icon } from "../../../../icons/Icon";
import { Field, Subtitle, RegularText } from "./DataItem.styled";

interface DataItemProps {
    icon: React.ReactNode;
    itemName: string;
    itemValue: string;
}

export const DataItem:React.FC<DataItemProps> = ({icon, itemName, itemValue}) => {
    return (
        <Field>
            <Subtitle>
                {
                    <Icon 
                        icon={icon} 
                        iconSize={'20px'} 
                        iconColor={theme.colors.regular}
                    />
                } {itemName}: 
            </Subtitle>
            <RegularText>
                {itemValue}
            </RegularText>
        </Field>
    )
}
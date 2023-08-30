import { theme } from "../../../../../styles/Theme";
import { Icon } from "../../../../icons/Icon";
import { Field, Subtitle, ItemValue} from "./DataItem.styled";

interface DataItemProps {
    icon: React.ReactNode;
    itemName: string;
    itemValue?: string | React.ReactNode;
    direction: 'column' | 'row';
}

export const DataItem:React.FC<DataItemProps> = ({icon, itemName, itemValue, direction}) => {
    return (
        <Field $direction={direction}>
            <Subtitle>
                {
                    <Icon 
                        icon={icon} 
                        iconSize={'18px'} 
                        iconColor={theme.colors.regular}
                    />
                } {itemName}: 
            </Subtitle>
            <ItemValue>
                {itemValue}
            </ItemValue>
        </Field>
    )
}
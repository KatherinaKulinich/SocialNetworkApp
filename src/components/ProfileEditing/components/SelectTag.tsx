import type { CustomTagProps } from 'rc-select/lib/BaseSelect';
import { Tag } from 'antd';
import { theme } from '@styles/Theme';


export const SelectTag = (props: CustomTagProps) => {
    const { label, value, closable, onClose } = props;
    
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
        event.preventDefault();
        event.stopPropagation();
    };
    
    return (
        <Tag
            color={theme.colors.regular}
            onMouseDown={onPreventMouseDown}
            closable={closable}
            onClose={onClose}
            style={{ marginRight: 3 }}
        >
            {label}
        </Tag>
    )
}
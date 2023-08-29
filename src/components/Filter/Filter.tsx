import { Select } from "antd"


interface FilterProps {
    handleChange: (event:any) => void;
    options: any[];
}

export const Filter:React.FC<FilterProps> = ({handleChange, options}) => {
    return (
        <Select
            defaultValue="lucy"
            style={{ width: 120 }}
            onChange={handleChange}
            options={options}
        />
    )
}
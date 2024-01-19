import { Select } from "antd"
import { FilterField, Label } from "./Filter.styled";


interface FilterProps {
    handleChange: (event:any, value: string) => void;
    filterOptions: any[];
    labelName?: string
}

export const Filter:React.FC<FilterProps> = ({handleChange, filterOptions, labelName}) => {

    
    return (
        <FilterField>
            <Label>
               {labelName}
            </Label>
            <Select
                defaultValue={filterOptions[0]?.value}
                style={{ width: 150 }}
                onChange={handleChange}
                options={filterOptions}
            />
        </FilterField>
    )
}
import { Select } from "antd"
import { FilterField, Label } from "./Filter.styled";


interface FilterProps {
    handleChange: (event:any, value: string) => void;
    filterOptions: any[];
}

export const Filter:React.FC<FilterProps> = ({handleChange, filterOptions}) => {

    
    return (
        <FilterField>
            <Label>
                Search by:
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
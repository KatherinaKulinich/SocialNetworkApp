import Autocomplete from '@mui/material/Autocomplete';
import { Field, InputField } from './UserSearchField.styled';
import { Icon } from '../icons/Icon';
import { RiUserSearchLine } from 'react-icons/Ri';
import { theme } from "../../styles/Theme";
import { Paper } from '@mui/material';


interface UserSearchFieldProps {
    searchOptions: any[];
    handleChange: (event: any, value: string) => void;
    label: string;
    value: string;
    handleInputChange: (event: any, value: string) => void;
    inputValue: string;
}


export const UserSearchField:React.FC<UserSearchFieldProps> = (
    {searchOptions, handleChange, label, value, inputValue, handleInputChange}) => {

    return (
        <Field>
            <Icon 
                iconSize={'30px'} 
                iconColor={theme.colors.mediumGray}
                icon={<RiUserSearchLine/>}
            />
            <Autocomplete
                clearOnBlur
                id="userSearch"
                size="small"
                options={searchOptions}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                onChange={handleChange}
                value={value}
                inputValue={inputValue}
                onInputChange={handleInputChange}
                sx={{ width: '100%'}}
                PaperComponent={(props) => (
                    <Paper
                        sx={{
                            background: "rgba(255, 255, 255, .9)",
                            color: `${theme.colors.darkGray}`,
                            fontSize: "20px",
                        }}
                        {...props}
                    />
                )}
                renderInput={(params) => <InputField  
                        {...params}   
                        label={`Start typing ${label}...`} 
                        variant="standard"
                        sx={{
                            "& input": {
                                color: '#969696',
                                caretColor: `${theme.colors.regular}`,
                            },
                        }}
                    />
                }
            />
        </Field>
    )
}

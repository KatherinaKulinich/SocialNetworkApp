import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Form, FormButton, InputField } from './UserSearchField.styled';
import { Icon } from '../icons/Icon';
import { ImSearch } from 'react-icons/Im';
import { theme } from "../../styles/Theme";


export const UserSearchField:React.FC = () => {
    return (
        <Form>
            <Autocomplete
                clearOnBlur
                id="userSearch"
                size="small"
                options={top100Films}
                sx={{ width: '100%' }}
                renderInput={(params) => <InputField  
                        {...params} 
                        label="Start typing username..." 
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
            <FormButton>
                <Icon 
                    icon={<ImSearch/>} 
                    iconSize="25px" 
                    iconColor="#969696"
                />
            </FormButton>
        </Form>
    )
}

const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: 'Pulp Fiction', year: 1994 }
]
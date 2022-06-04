import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectSmall(props) {

    const handleChange = (event) => {
        props.onChange(event.target.value);
    };

    return (
        <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
            <InputLabel id="demo-select-small">{props.label}</InputLabel>
            <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value= {props.value}
                label= {props.label}
                onChange={handleChange}
            >
                {props.list.map((movies) => (
                    <MenuItem key={movies.value} value={movies.value}>{movies.name}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

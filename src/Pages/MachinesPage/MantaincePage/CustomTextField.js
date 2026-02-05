// components/CustomTextField.js
import { TextField } from '@mui/material';

const CustomTextField = ({ variant = 'standard', required, label, name, type = 'text', multiline, rows, value, onChange, endAdornment }) => {
    return (
        <TextField
            variant={variant}
            required={required}
            label={label}
            name={name}
            className='bodyRegularText4'
            type={type}
            multiline={multiline}
            rows={rows}
            fullWidth
            value={value}
            onChange={onChange}
            InputProps={{
                sx: {
                    color: '#C2C2C4',
                    py: 1,
                    my: 3,
                    pr:4,
                    '&:before': { borderBottom: '0.5px solid #C6C6C6' },
                    '&:after': { borderBottom: '0.5px solid #C6C6C6' },
                    '&:hover:not(.Mui-disabled):before': { borderBottom: '0.5px solid #C6C6C6' },
                },
                endAdornment: endAdornment,
            }}
            InputLabelProps={{
                sx: {
                    color: '#C2C2C4', '&.Mui-focused': {
                        color: '#C2C2C4', // stays white when focused
                    },
                },
            }}
        />
    );
};

export default CustomTextField;

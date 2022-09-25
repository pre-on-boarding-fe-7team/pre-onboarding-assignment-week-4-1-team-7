import { TextField } from '@mui/material';

const FilterSelect = ({ label, name, value, changeHandler, children, ...other }) => (
  <TextField
    fullWidth
    label={label}
    onChange={changeHandler}
    select
    SelectProps={{ native: true }}
    name={name}
    value={value}
    variant="outlined"
    {...other}
  >
    <option key="ALL_STATUS" value=""></option>
    {children}
  </TextField>
);

export default FilterSelect;

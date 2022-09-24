import { Box, Button, Card, CardContent, Divider, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getStatus, jsonToArray } from '../../../common/utils/field.util';
import FilterSelect from '../../../components/FilterSelect/FilterSelect';
import { updateAccount } from '../../../modules/accountSlice';

const initialInputs = {
  name: '',
  is_active: true,
  status: '',
};

const AccountInputs = ({ data }) => {
  const { name, is_active, status } = data;
  const [inputs, setInputs] = useState(initialInputs);
  const changeHandler = ({ target: { name, value } }) => {
    setInputs(state => ({ ...state, [name]: value }));
  };
  const dispatch = useDispatch();
  const saveHandler = e => {
    e.preventDefault();
    dispatch(updateAccount({ ...data, ...inputs, updated_at: new Date().toISOString() }));
  };

  useEffect(() => {
    setInputs({ name, is_active, status });
  }, [name, is_active, status]);

  return (
    <form autoComplete="off">
      <Card>
        <CardContent>
          <TextField
            fullWidth
            label="계좌명"
            name="name"
            onChange={changeHandler}
            required
            value={inputs.name}
            sx={{ mb: 4 }}
            variant="outlined"
          />
          <FilterSelect
            label="계좌활성화여부"
            onChange={changeHandler}
            name="is_active"
            value={inputs.is_active}
            sx={{ mb: 4 }}
          >
            <option key="true" value="true">
              활성화
            </option>
            <option key="false" value="false">
              비활성화
            </option>
          </FilterSelect>
          <FilterSelect
            label="계좌상태"
            onChange={changeHandler}
            name="status"
            value={inputs.status}
          >
            {jsonToArray(getStatus()).map(option => (
              <option key={option.value} value={option.value}>
                {option.key}
              </option>
            ))}
          </FilterSelect>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2,
          }}
        >
          <Button color="primary" variant="contained" onClick={saveHandler}>
            저장
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default AccountInputs;

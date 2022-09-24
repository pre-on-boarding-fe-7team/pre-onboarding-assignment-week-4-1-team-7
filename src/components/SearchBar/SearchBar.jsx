import {
  Box,
  Card,
  CardContent,
  InputAdornment,
  SvgIcon,
  TextField,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { getStatus, jsonToArray } from '../../common/utils/field.util';
import { getBrokers } from '../../common/utils/field.util';
import { useEffect, useState } from 'react';
import useQeuryStringParams from '../../common/hooks/useQeuryStringParams';

const SearchBar = ({ title }) => {
  const [values, setValues] = useState({
    q: '',
    broker_id: '',
    is_active: '',
    status: '',
  });
  const [{ q, broker_id, is_active, status }, setQueryString] = useQeuryStringParams();
  const searchHandler = ({ target: { value }, key }) => {
    if (key !== 'Enter') return;

    setQueryString({ _page: 1, q: value });
  };
  const searchChangeHandler = ({ target: { value } }) => {
    setValues(state => ({ ...state, q: value }));
  };
  const changeHandler = ({ target: { name, value } }) => {
    setValues(state => ({ ...state, [name]: value }));
    setQueryString({ [name]: value });
  };

  useEffect(() => {
    setValues(state => ({
      ...state,
      q: q || '',
      broker_id: broker_id || '',
      is_active: is_active || '',
      status: status || '',
    }));
  }, [q, broker_id, is_active, status]);

  return (
    <Box>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          m: -1,
        }}
      >
        <Typography sx={{ m: 1 }} variant="h4">
          {title}
        </Typography>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box style={{ display: 'flex' }}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon color="action" fontSize="small">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                onKeyDown={searchHandler}
                onChange={searchChangeHandler}
                name="q"
                value={values.q}
              />
              <TextField
                fullWidth
                label="브로커명"
                onChange={changeHandler}
                select
                SelectProps={{ native: true }}
                name="broker_id"
                value={values.broker_id}
                variant="outlined"
              >
                <option key="ALL_BROKER" value=""></option>
                {jsonToArray(getBrokers()).map(option => (
                  <option key={option.key} value={option.key}>
                    {option.value}
                  </option>
                ))}
              </TextField>
              <TextField
                fullWidth
                label="계좌 활성화여부"
                onChange={changeHandler}
                select
                SelectProps={{ native: true }}
                name="is_active"
                value={values.is_active}
                variant="outlined"
              >
                <option key="ALL_ACTIVE" value=""></option>
                <option key="true" value="true">
                  활성화
                </option>
                <option key="false" value="false">
                  비활성화
                </option>
              </TextField>
              <TextField
                fullWidth
                label="계좌 상태"
                onChange={changeHandler}
                select
                SelectProps={{ native: true }}
                name="status"
                value={values.status}
                variant="outlined"
              >
                <option key="ALL_STATUS" value=""></option>
                {jsonToArray(getStatus()).map(option => (
                  <option key={option.value} value={option.value}>
                    {option.key}
                  </option>
                ))}
              </TextField>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default SearchBar;

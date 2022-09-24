import { Box, Card, CardContent, InputAdornment, SvgIcon, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { getStatus, jsonToArray } from '../../common/utils/field.util';
import { getBrokers } from '../../common/utils/field.util';
import { useEffect, useState } from 'react';
import useQeuryStringParams from '../../common/hooks/useQeuryStringParams';
import FilterSelect from '../FilterSelect/FilterSelect';

const SearchBar = () => {
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
              <FilterSelect
                label="브로커명"
                onChange={changeHandler}
                name="broker_id"
                value={values.broker_id}
              >
                <option key="ALL_BROKER" value=""></option>
                {jsonToArray(getBrokers()).map(option => (
                  <option key={option.key} value={option.key}>
                    {option.value}
                  </option>
                ))}
              </FilterSelect>
              <FilterSelect
                label="계좌 활성화여부"
                changeHandler={changeHandler}
                name="is_active"
                value={values.is_active}
              >
                <option key="true" value="true">
                  활성화
                </option>
                <option key="false" value="false">
                  비활성화
                </option>
              </FilterSelect>
              <FilterSelect
                label="계좌 상태"
                changeHandler={changeHandler}
                name="status"
                value={values.status}
              >
                {jsonToArray(getStatus()).map(option => (
                  <option key={option.value} value={option.value}>
                    {option.key}
                  </option>
                ))}
              </FilterSelect>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default SearchBar;

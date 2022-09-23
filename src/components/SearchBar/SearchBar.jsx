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
import { jsonToArray } from '../../common/utils/field.util';
import { useSearchParams } from 'react-router-dom';

const brokerList = jsonToArray({
  209: '유안타증권',
  218: '현대증권',
  230: '미래에셋증권',
  238: '대우증권',
  240: '삼성증권',
  243: '한국투자증권',
  247: '우리투자증권',
  261: '교보증권',
  262: '하이투자증권',
  263: 'HMC투자증권',
  264: '키움증권',
  265: '이베스트투자증권',
  266: 'SK증권',
  267: '대신증권',
  268: '아이엠투자증권',
  269: '한화투자증권',
  270: '하나대투자증권',
  279: '동부증권',
  280: '유진투자증권',
  288: '카카오페이증권',
  287: '메리츠종합금융증권',
  290: '부국증권',
  291: '신영증권',
  292: 'LIG투자증권',
  271: '토스증권',
});

const SearchBar = ({ title, onSearch, setMenu }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  //   const changeHandler = e => {
  //     setQuery(e.target.value);
  //   };
  console.info(searchParams);
  // const broker_id = searchParams.get('broker');
  // const is_active = searchParams.get('active');

  const selectoption = ({ target: { value } }) => {
    setSearchParams({ page: 1, broker_id: value });
  };
  const searchHandler = ({ target: { value }, key }) => {
    if (key !== 'Enter') return;
    setSearchParams({ page: 1, q: value });
  };

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
            <Box sx={{ maxWidth: 200 }}>
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
                // onChange={changeHandler}
                // value={query}
              />
              <TextField
                fullWidth
                label="Select State"
                name="broker_name"
                onChange={selectoption}
                select
                SelectProps={{ native: true }}
                // value={values.state}
                variant="outlined"
              >
                {brokerList.map(option => (
                  <option key={option.key} value={option.key}>
                    {option.value}
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

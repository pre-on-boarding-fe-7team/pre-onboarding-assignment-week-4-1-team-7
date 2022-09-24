import { Typography } from '@mui/material';

const Earning = ({ children, assets, payments }) => {
  let color = 'black';

  if (assets > payments) color = 'red';
  else if (assets < payments) color = 'blue';

  return <Typography sx={{ color }}>{children}</Typography>;
};

export default Earning;

import React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
const Footer = () => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" style={{ padding: '20px 0' }}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

export default Footer;

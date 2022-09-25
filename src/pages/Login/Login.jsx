import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from '../../common/utils/constant';

const Login = ({ auth, token }) => {
  const emailRef = useRef();
  const pwRef = useRef();
  const navigate = useNavigate();

  // 토큰 있다면 /users로 리다이렉트
  useEffect(() => {
    if (token.getToken()) {
      navigate(ROUTE.ACCOUNTS);
    }
  });

  const onSubmit = async event => {
    event.preventDefault();
    const email = emailRef.current.value;
    const pw = pwRef.current.value;
    console.info(email);
    await auth.signIn(email, pw);
    navigate(ROUTE.ACCOUNTS);
  };

  return (
    <>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          // minHeight: '100%',
          my: 20,
        }}
      >
        <Box sx={{ my: 8 }}>
          <Typography color="textPrimary" variant="h2">
            PREFACE
          </Typography>
          <Typography style={{ margin: '3px' }} color="textSecondary" variant="body1">
            Investment Management Services
          </Typography>
        </Box>
        <Box>
          <form onSubmit={onSubmit}>
            <TextField
              style={{ width: '300px', margin: '5px' }}
              inputRef={emailRef}
              name="email"
              type="email"
              variant="outlined"
              margin="normal"
              placeholder="Email"
              required
            />
            <br />
            <TextField
              style={{ width: '300px', margin: '5px' }}
              inputRef={pwRef}
              name="password"
              type="password"
              variant="outlined"
              margin="normal"
              placeholder="Password"
              required
            />
            <br />
            <Button
              style={{ width: '300px', margin: '5px' }}
              type="submit"
              color="info"
              size="large"
              variant="contained"
            >
              Login
            </Button>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default Login;

// import React, { useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { useState } from 'react';
import LoginForm from './LoginForm';
import { Container } from './Main.style';
import SignUpForm from './SignUpForm';

// 이 페이지 처음에 들어왔을 때 localstorage에 토큰 있으면 자동으로 로그인 후 보이는 페이지로 연동되게끔.
function Main() {
  const [isSignUp, setisSignUp] = useState(false);
  return (
    <Container maxWidth={'1000px'} sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid xs={8}>
          {isSignUp ? (
            <SignUpForm setisSignUp={setisSignUp} />
          ) : (
            <LoginForm setisSignUp={setisSignUp} />
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default Main;

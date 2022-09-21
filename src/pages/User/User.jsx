import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import React from 'react';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function User() {
  return (
    <Box minWidth={'1200px'}>
      <Grid container>
        <Grid item xs={1}>
          <Item>고객명</Item>
        </Grid>
        <Grid item xs={1}>
          <Item>계좌 수</Item>
        </Grid>
        <Grid item xs={1}>
          <Item>이메일</Item>
        </Grid>
        <Grid item xs={1}>
          <Item>성별</Item>
        </Grid>
        <Grid item xs={1}>
          <Item>생년월일</Item>
        </Grid>
        <Grid item xs={1}>
          <Item>번호</Item>
        </Grid>
        <Grid item xs={1}>
          <Item>최근 로그인</Item>
        </Grid>
        <Grid item xs={2}>
          <Item>수신 동의 여부</Item>
        </Grid>
        <Grid item xs={1}>
          <Item>활성화 여부</Item>
        </Grid>
        <Grid item xs={1}>
          <Item>가입일</Item>
        </Grid>
      </Grid>
    </Box>
  );
}

export default User;

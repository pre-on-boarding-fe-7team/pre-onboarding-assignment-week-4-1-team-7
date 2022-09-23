import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Container, Item } from './Main.style';
// import { useDispatch, useSelector } from 'react-redux';
// import { getUserSettingFetch } from '../../modules/userSettingSlice';
// import { useEffect } from 'react';

// mui tutorial
function Main() {
  // const dispatch = useDispatch();
  // const setting = useSelector(state => {
  //   return state.setting.setting;
  // });
  // const status = useSelector(state => {
  //   return state.setting.status;
  // });
  // useEffect(() => {
  //   dispatch(getUserSettingFetch());
  // }, [dispatch]);

  //에러처리 하기
  // if (status && !setting) return <div>{status}</div>;
  return (
    <Container maxWidth={'1000px'} sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid xs={8}>
          <Item>xs=8</Item>
        </Grid>
        <Grid xs={4}>
          <Item>xs=4</Item>
        </Grid>
        <Grid xs={4}>
          <Item>xs=4</Item>
        </Grid>
        <Grid xs={8}>
          <Item>xs=8 </Item>
        </Grid>
      </Grid>
      <Stack spacing={2} direction="row">
        <Button variant="text">Text</Button>
        <Button variant="contained">Contained</Button>
        <Button variant="outlined">Outlined</Button>
      </Stack>
    </Container>
  );
}

export default Main;

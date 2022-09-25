import { Box, Container, Grid } from '@mui/material';
import { fetchAccount } from '../../modules/accountSlice';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Loading from '../../components/Loading/Loading';
import AccountInputs from './Account/AccountInputs';
import Account from './Account/Account';

const AccountDetail = () => {
  const uuid = useParams().uuid;
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(state => state.account);

  useEffect(() => {
    dispatch(fetchAccount({ uuid }));
  }, [dispatch, uuid]);

  if (loading) return <Loading />;
  if (error) return <p>에러</p>;
  if (data)
    return (
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <Account data={data} />
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <AccountInputs data={data} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    );
};

export default AccountDetail;

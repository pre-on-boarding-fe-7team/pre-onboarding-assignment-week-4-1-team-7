import { Container } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from '../../common/utils/constant';
import SearchBar from '../../components/SearchBar/SearchBar';
import AccountList from './AccountList/AccountList';

const Accounts = ({ token }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!token.getToken()) navigate(ROUTE.LOGIN);
  }, []);

  return (
    <Container>
      <SearchBar />
      <AccountList />
    </Container>
  );
};

export default Accounts;

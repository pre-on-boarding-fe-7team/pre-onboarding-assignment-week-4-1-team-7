import { Container } from '@mui/material';
import SearchBar from '../../components/SearchBar/SearchBar';
import AccountList from './AccountList/AccountList';

const Accounts = () => {
  return (
    <Container>
      <SearchBar title="계좌 목록" />
      <AccountList />
    </Container>
  );
};

export default Accounts;

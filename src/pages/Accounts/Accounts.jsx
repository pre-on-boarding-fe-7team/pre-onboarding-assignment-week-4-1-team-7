import { Container } from '@mui/material';
import SearchBar from '../../components/SearchBar/SearchBar';
import AccountList from './AccountList/AccountList';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
const Accounts = () => {
  let [menu, setMenu] = useState('209');
  let [items, setitems] = useState([]);

  useEffect(() => {
    search();
  }, [menu]);

  const search = async () => {
    const params = {
      Name: `${menu}`,
    };
    await axios
      .get(`http://localhost:4000/accounts?broker_id=${params.Name}`)
      .then(response => {
        setitems(response.data);
        console.info(items);
      })
      .catch(error => {
        console.info(error);
      });
  };
  console.info(menu);
  return (
    <Container>
      <SearchBar title="계좌목록" setMenu={setMenu} />
      <AccountList items={items} />
    </Container>
  );
};

export default Accounts;

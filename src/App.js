import { Route, Routes, useNavigate } from 'react-router-dom';
import { ROUTE } from './common/utils/constant';
import Login from './pages/Login/Login';
import NotFound from './pages/NotFound/NotFound';
import Users from './pages/Users/Users';
import Accounts from './pages/Accounts/Accounts';
import Header from './components/Header';
import Sider from './components/Sider';
import Footer from './components/Footer';
import { Box, Div } from './App.style';
import AccountDetail from './pages/AccountsDetail/AccountDetail';
import UserDetail from './pages/UserDetail/UserDetail';
import { useEffect, useState } from 'react';

function App({ auth, token }) {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const logoutHandler = () => {
    auth.logout();
    setIsLogin(false);
    navigate(ROUTE.LOGIN);
  };

  useEffect(() => {
    setIsLogin(token.getToken());
  }, [token.getToken()]);

  return (
    <>
      {isLogin && <Header logoutHandler={logoutHandler} isLogin={isLogin} />}
      <Box>
        {isLogin && <Sider />}
        <Div>
          <Routes>
            <Route path={ROUTE.LOGIN} element={<Login auth={auth} token={token} />} />
            <Route path={ROUTE.USERS} element={<Users token={token} />} />
            <Route path={ROUTE.USERS_DETAIL} element={<UserDetail token={token} />} />
            <Route path={ROUTE.ACCOUNTS} element={<Accounts token={token} />} />
            <Route path={ROUTE.ACCOUNT_DETAIL} element={<AccountDetail />} />
            <Route path={ROUTE.NOT_FOUND} element={<NotFound />} />
          </Routes>
          <Footer />
        </Div>
      </Box>
    </>
  );
}

export default App;

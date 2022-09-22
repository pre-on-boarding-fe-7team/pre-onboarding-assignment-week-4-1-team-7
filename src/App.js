import { Route, Routes } from 'react-router-dom';
import { ROUTE } from './common/utils/constant';
import Main from './pages/Main/Main';
import NotFound from './pages/NotFound/NotFound';
import Users from './pages/Users/Users';
import Account from './pages/Account/Account';
import Footer from './components/Footer';
import { Sider } from './components/Sider';
import { Header } from './components/Header';
// import DashBoard from './components/DashBoard';

function App() {
  return (
    <>
      <Header />
      <Sider />
      {/* <DashBoard /> */}
      <Routes>
        <Route path={ROUTE.MAIN} element={<Main />} />
        <Route path="/users" element={<Users />} />
        <Route path="/account" element={<Account />} />
        <Route path={ROUTE.NOT_FOUND} element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;

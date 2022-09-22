import { Route, Routes } from 'react-router-dom';
import { ROUTE } from './common/utils/constant';
import Main from './pages/Main/Main';
import NotFound from './pages/NotFound/NotFound';
import Accounts from './pages/Accounts/Accounts';
import Header from './components/Header';
import Sider from './components/Sider';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header />
      <Sider />
      <Routes>
        <Route path={ROUTE.MAIN} element={<Main />} />
        <Route path={ROUTE.ACCOUNTS} element={<Accounts />} />
        <Route path={ROUTE.NOT_FOUND} element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

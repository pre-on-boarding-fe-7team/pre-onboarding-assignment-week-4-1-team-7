import { Route, Routes } from 'react-router-dom';
import { ROUTE } from './common/utils/constant';
import Main from './pages/Main/Main';
import NotFound from './pages/NotFound/NotFound';
import Account from './pages/Account/Account';

function App() {
  return (
    <Routes>
      <Route path={ROUTE.MAIN} element={<Main />} />
      <Route path="/account" element={<Account />} />
      <Route path={ROUTE.NOT_FOUND} element={<NotFound />} />
    </Routes>
  );
}

export default App;

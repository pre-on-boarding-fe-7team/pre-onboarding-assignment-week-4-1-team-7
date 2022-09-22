import { Route, Routes } from 'react-router-dom';
import { ROUTE } from './common/utils/constant';
import Main from './pages/Main/Main';
import NotFound from './pages/NotFound/NotFound';
import Accounts from './pages/Accounts/Accounts';

function App() {
  return (
    <Routes>
      <Route path={ROUTE.MAIN} element={<Main />} />
      <Route path={ROUTE.ACCOUNTS} element={<Accounts />} />
      <Route path={ROUTE.NOT_FOUND} element={<NotFound />} />
    </Routes>
  );
}

export default App;

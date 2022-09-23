import { Route, Routes } from 'react-router-dom';
import { ROUTE } from './common/utils/constant';
import Main from './pages/Main/Main';
import NotFound from './pages/NotFound/NotFound';
import UserDetail from './pages/UserDetail/UserDetail';
import UserList from './pages/Users/Users';

function App() {
  return (
    <Routes>
      <Route path={ROUTE.MAIN} element={<Main />} />
      <Route path={ROUTE.USER_LIST} element={<UserList />} />
      <Route path={ROUTE.USER_DETAIL} element={<UserDetail />} />
      <Route path={ROUTE.NOT_FOUND} element={<NotFound />} />
    </Routes>
  );
}

export default App;

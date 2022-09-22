import { Route, Routes } from 'react-router-dom';
import { ROUTE } from './common/utils/constant';
import Login from './pages/Login/Login';
import Main from './pages/Main/Main';
import NotFound from './pages/NotFound/NotFound';
import Users from './pages/Users/Users';

function App({ auth, token }) {
  return (
    <Routes>
      <Route path={ROUTE.MAIN} element={<Main />} />
      <Route path="/login" element={<Login auth={auth} token={token} />} />
      <Route path="/users" element={<Users token={token} />} />
      <Route path={ROUTE.NOT_FOUND} element={<NotFound />} />
    </Routes>
  );
}

export default App;

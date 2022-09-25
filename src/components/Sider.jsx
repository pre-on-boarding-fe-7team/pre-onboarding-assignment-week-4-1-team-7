import { Link, useLocation } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import Drawer from '@mui/material/Drawer';
import styled from '@emotion/styled';
import List from '@mui/material/List';

const isAccount = pathName => {
  if (pathName === `accounts` || pathName === 'account') return 'active_nav';
  else return '';
};

const isUser = pathName => {
  if (pathName === `users` || pathName === 'user') return 'active_nav';
  else return '';
};

const Sider = () => {
  const pathName = useLocation().pathname.replace('/', '').split('/')[0];

  return (
    <SiderBar>
      <StyledDrawer variant="permanent">
        <List component="nav">
          <SideLink to="/accounts">
            <ListBtn className={isAccount(pathName)}>
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary="계좌목록" />
            </ListBtn>
          </SideLink>
          <SideLink to="/users">
            <ListBtn className={isUser(pathName)}>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="사용자" />
            </ListBtn>
          </SideLink>
        </List>
      </StyledDrawer>
    </SiderBar>
  );
};

export default Sider;

const SiderBar = styled.div`
  position: relative;
  & > div {
    height: 100%;
  }
`;

const StyledDrawer = styled(Drawer)`
  & > div {
    position: sticky;
    top: 60px;
  }
`;

const ListBtn = styled(ListItemButton)`
  &.active_nav {
    background: rgb(85, 108, 214, 0.6);
  }
`;

const SideLink = styled(Link)`
  color: black;
  text-decoration: none;
  outline: none;
  &:hover,
  &:active {
    text-decoration: none;
    color: black;
  }
`;

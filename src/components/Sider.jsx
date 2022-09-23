import { useLocation } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import Drawer from '@mui/material/Drawer';
import styled from '@emotion/styled';
import List from '@mui/material/List';

const Sider = () => {
  const pathName = useLocation().pathname;
  const pathRoute = pathName.split('/')[1];

  return (
    <SiderBar>
      <StyledDrawer variant="permanent">
        <List component="nav">
          <ListBtn className={`${pathRoute === `accounts` ? 'active_nav' : ''}`}>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="계좌목록" />
          </ListBtn>
          <ListBtn className={`${pathRoute === `users` ? 'active_nav' : ''}`}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="사용자" />
          </ListBtn>
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

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import Drawer from '@mui/material/Drawer';
import styled from '@emotion/styled';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';

import Divider from '@mui/material/Divider';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

const Sider = () => {
  return (
    <SiderBar>
      <Drawer variant="permanent">
        <List component="nav">
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton>
              <AccountBalanceIcon />
              TEAM 7
            </IconButton>
          </Toolbar>
          <Divider />
          <ListItemButton>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <SideLink to="/accounts">
              <ListItemText primary="계좌목록" />
            </SideLink>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="사용자" />
          </ListItemButton>

          <Divider sx={{ my: 1 }} />
        </List>
      </Drawer>
    </SiderBar>
  );
};

export default Sider;

const SiderBar = styled.div``;

const SideLink = styled(Link)(({ theme }) => ({
  color: 'black',
  textDecoration: 'none',
  outline: 'none',
}));

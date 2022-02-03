import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon  from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ListItemButton from '@mui/material/ListItemButton';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import InfoIcon from '@mui/icons-material/Info';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';

import {
  BrowserRouter as Router,
  withRouter
} from "react-router-dom";

type Anchor = 'top' | 'left' | 'bottom' | 'right';

const drawerData = [{
  primary: 'Home',
  icon: <HomeIcon />,
  Disabled: false,
  redirect: '/'
  },
  {
    primary: 'Your orders',
    icon: <ArticleIcon />,
    Disabled: false,
    redirect: '/cart'
  },
  {
    primary: 'Offers',
    icon: <LocalOfferIcon />,
    Disabled: true
  },
  {
    primary: 'Notifications',
    icon: <NotificationsActiveIcon />,
    Disabled: true
  },
  {
    primary: 'Become a Partner',
    icon: <SupervisedUserCircleIcon />,
    Disabled: false,
    redirect: '/becomeapartner'
  },
  {
    primary: 'Get Help',
    icon: <HelpOutlineIcon />,
    Disabled: true
  },
  {
    primary: 'About',
    icon: <InfoIcon />,
    Disabled: true
  },
];

const SwipeableTemporaryDrawer = props => {
  const [state, setState] = React.useState({
    left: false,
  });

  const {history} = props;
  const handleLinkClick = (pageURL) => {
    history.push(pageURL)
    window.location.reload();
  }

  const handleLogoutClick = () => {
    localStorage.clear();
    history.push('/')
    window.location.reload();
  }

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

    const renderDrawer = drawerData.map((item) => 
    <ListItemButton disabled={item.Disabled} onClick={() => handleLinkClick(item.redirect)}>
      <ListItemIcon>
        {item.icon}
        </ListItemIcon>
        <ListItemText primary={item.primary} />
    </ListItemButton>
    );

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {renderDrawer}
        <ListItemButton  onClick={() => handleLogoutClick()}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary='Logout' />
        </ListItemButton>
      </List>
    </Box>
  );
  
  return (
    <Router>
      <div>
        {(['left'] as const).map((anchor) => (
          <React.Fragment key={anchor}>
            <IconButton
              onClick={toggleDrawer(anchor, true)}
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2, color: 'white' }}
              >
                <MenuIcon />
            </IconButton>
            <SwipeableDrawer
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
              onOpen={toggleDrawer(anchor, true)}
            >
              {list(anchor)}
            </SwipeableDrawer>
          </React.Fragment>
        ))}
      </div>
    </Router>
  );
}

export default withRouter(SwipeableTemporaryDrawer);
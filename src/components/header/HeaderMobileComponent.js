import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MoreIcon from '@mui/icons-material/MoreVert';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import logoImg from "../../app/image/logo.PNG";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import LoginModal from "../modals/LoginModal";
import SigninModal from '../modals/SigninModal';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function HeaderMobileComponent() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const anchor = "left";
  const [state, setState] = useState({
    left: false,
  });

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const [user, setUser] = useState([]);
  const [itemList, setItemList] = useState(0);
  const [productType, setProductType] = useState(null);

  const [input, setInput] = useState("");

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const onBtnSignInClick = () => {
    dispatch({
      type: "SIGNIN_MODAL",
      payload: {
        openSignInModal: true
      }
    })
    handleMenuClose();
  }

  const onBtnLogInClick = () => {
    dispatch({
      type: "LOGIN_MODAL",
      payload: {
        openLoginModal: true
      }
    })
    handleMenuClose();
  }

  const onBtnLogoutClick = () => {
    auth.signOut()
      .then(() => {
        dispatch({
          type: "SET_USER",
          payload: {
            user: null
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
    let userArrayTemp = [];
    localStorage.setItem("userInfo", JSON.stringify(userArrayTemp));

    handleMenuClose();
  }

  const onInputSearchChange = (event) => {
    //console.log(event.target.value);
    setInput(event.target.value)
  }

  const onInputSearchEnter = (event) => {
    if (event.key == "Enter") {
      navigate("/products?name=" + input)
    }
  }

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton className="d-flex justify-content-center" onClick={() => { navigate("/") }}>
            <img src={logoImg} className="w-50" alt="logoImg"></img>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding onClick={() => { navigate("/") }}>
          <ListItemButton>
            <ListItemIcon>
              <i className="fa-solid fa-house"></i>
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding onClick={() => { navigate("/products") }}>
          <ListItemButton>
            <ListItemIcon>
              <i className="fas fa-list"></i>
            </ListItemIcon>
            <ListItemText primary="Products" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding onClick={() => { navigate("/orders") }}>
          <ListItemButton>
            <ListItemIcon>
              <Badge badgeContent={itemList} color="info">
                <ShoppingCartIcon />
              </Badge>
            </ListItemIcon>
            <ListItemText primary="Shopping Cart" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const menuId = 'primary-search-account-menu';

  const renderDrawer = (
    <SwipeableDrawer
      anchor={anchor}
      open={state[anchor]}
      onClose={toggleDrawer(anchor, false)}
      onOpen={toggleDrawer(anchor, true)}
    >
      {list(anchor)}
    </SwipeableDrawer>
  );

  const renderMenuProfile = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {
        user.length >= 1
          ?
          <>
            <MenuItem onClick={handleMenuClose}>User: {user[0].displayName}</MenuItem>
            <MenuItem onClick={onBtnLogoutClick}>Log Out</MenuItem>
          </>
          :
          <>
            <MenuItem onClick={onBtnSignInClick}>Sign In</MenuItem>
            <MenuItem onClick={onBtnLogInClick}>Log In</MenuItem>
          </>
      }
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {
        user.length >= 1
          ?
          <>
            <MenuItem onClick={handleMenuClose}>User: {user[0].displayName}</MenuItem>
            <MenuItem onClick={onBtnLogoutClick}>Log Out</MenuItem>
          </>
          :
          <>
            <MenuItem onClick={onBtnSignInClick}>Sign In</MenuItem>
            <MenuItem onClick={onBtnLogInClick}>Log In</MenuItem>
          </>
      }
    </Menu>
  );

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("userInfo")) || []);

    let orderList = JSON.parse(localStorage.getItem("orderList")) || [];
    setItemList(orderList.length)
  });

  useEffect(() => {
    /*auth.onAuthStateChanged((result) => {
        dispatch({
            type: "SET_USER",
            payload: {
                user: result
            }
        });
    });*/

    fetch("https://shop24-backend.herokuapp.com/productTypes" || "http://localhost:8000/productTypes")
      .then(response => response.json())
      .then(result => {
        setProductType(result.data);
      })
      .catch(error => console.log('error', error));
  }, [])

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="inherit" enableColorOnDark>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer(anchor, true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <img src={logoImg} alt="logoImg" style={{ width: "50px" }} onClick={() => { navigate("/") }}></img>

            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                onInput={onInputSearchChange}
                onKeyPress={onInputSearchEnter}
              />
            </Search>

            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <IconButton size="large" aria-label="show items in cart" color="inherit" onClick={() => navigate("/orders")}>
                <Badge badgeContent={itemList} color="info">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenuProfile}
        {renderDrawer}
      </Box>
      {/* Modals */}
      <LoginModal />
      <SigninModal />
    </>
  );
}

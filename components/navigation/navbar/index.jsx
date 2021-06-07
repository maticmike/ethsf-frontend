import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { AppBar, Toolbar, Menu, MenuItem, Button, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import { MIN_DESKTOP_PX } from '../../../constants/ScreenSize';
import { useStyles } from './styles';

const Sidebar = dynamic(() => import('../sidebar'), {
  loading: () => <p>Sidebar Loading....</p>,
});
const ConnectButton = dynamic(() => import('../connectbutton'), {
  loading: () => <p>Connect Loading....</p>,
});
const Signup = dynamic(() => import('../../signupDialog'), {
  loading: () => <p>Signup Loading....</p>,
});

const Navbar = () => {
  const classes = useStyles();

  const router = useRouter();

  const [isSignupOpen, setIsOpenSignup] = useState(false);

  // const account = useSelector(state => state.account);

  const [languagesMenu, setLanguagesMenu] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [width, setWidth] = useState(0); // show mobile by default

  const openLanguagesMenu = e => setLanguagesMenu(e.currentTarget);
  const closeLanguagesMenu = () => setLanguagesMenu(null);

  const handleDrawerOpen = () => setSidebarOpen(true);
  const handleDrawerClose = () => setSidebarOpen(false);

  const updateWidth = () => setWidth(window.innerWidth);

  const handleSignupOpen = () => setIsOpenSignup(true);
  const handleSignupClose = () => setIsOpenSignup(false);

  const dummyArray = [1, 2, 3, 4, 5, 6];

  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  return (
    <>
      {width > MIN_DESKTOP_PX ? (
        <AppBar position="sticky">
          <Toolbar>
            {/* <Link href="/marketplace" className={classes.navbarDesktopMenuButton}> */}
            <a href="/">
              {/* <Image className={classes.navbarLogo} src="https://www.mandfhealth.co.uk/wp-content/uploads/2017/12/celebrity-1.jpg" alt="OpenNFT Logo" width="180" height="54" /> */}
              <img
                src="https://www.mandfhealth.co.uk/wp-content/uploads/2017/12/celebrity-1.jpg"
                alt="OpenNFT Logo"
                width="50"
                height="54"
              />
            </a>
            {/* <Link className={classes.navbarDesktopMenuButton} href="/marketplace"> */}
            <a href="/">
              <Button>
                <strong>New Campaign</strong>
              </Button>
            </a>
            <a className={classes.navbarDesktopMenuButton} href="/">
              <Button>
                <strong className={classes.navbarDesktopMenuButton}>Ongoing Campaigns</strong>
              </Button>
            </a>
            <div className={classes.navbarGrow} />
            <ConnectButton handleSignupOpen={handleSignupOpen} />
            &nbsp;
            <Button className={classes.languageButton} variant="outlined" onClick={openLanguagesMenu}>
              Test Dropdown
            </Button>
            &nbsp;
            <Menu
              id="currency-types"
              anchorEl={languagesMenu}
              keepMounted
              open={Boolean(languagesMenu)}
              onClose={closeLanguagesMenu}
            >
              {dummyArray.map((key, value) => {
                return (
                  // <Link href={router.asPath} locale={key} key={key}>
                  <MenuItem onClick={closeLanguagesMenu} key={key}>
                    {value}
                  </MenuItem>
                  // </Link>
                );
              })}
            </Menu>
          </Toolbar>
        </AppBar>
      ) : (
        <>
          <AppBar
            position="sticky"
            className={clsx(classes.navbarAppBar, {
              [classes.navbarAppBarShift]: sidebarOpen,
            })}
          >
            <Toolbar className={classes.navbarBackground}>
              <IconButton
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.navbarMobileMenuButton, sidebarOpen && classes.navbarHide)}
              >
                <MenuIcon />
              </IconButton>
              <a href="/" className={classes.navbarDesktopMenuButton}>
                <Image
                  className={classes.navbarLogo}
                  src="/logo-large.png"
                  alt="OpenNFT Logo"
                  width="180"
                  height="54"
                />
              </a>
            </Toolbar>
          </AppBar>
          {/* <Sidebar
            className={classes.navbarSideBar}
            isSidebarOpen={sidebarOpen}
            closeSidebar={handleDrawerClose}
            account={account}
            showMyNft={showMyNft}
            openLanguagesMenu={openLanguagesMenu}
            closeLanguagesMenu={closeLanguagesMenu}
            languagesMenu={languagesMenu}
          /> */}
        </>
      )}
      <Signup isSignupOpen={isSignupOpen} handleSignupClose={handleSignupClose} />
    </>
  );
};

export default Navbar;

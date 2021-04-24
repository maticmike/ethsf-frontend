import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import Link from 'next/link';
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

const Navbar = () => {
  const classes = useStyles();

  const router = useRouter();

  // const account = useSelector(state => state.account);

  const [languagesMenu, setLanguagesMenu] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [width, setWidth] = useState(0); // show mobile by default

  const openLanguagesMenu = e => setLanguagesMenu(e.currentTarget);
  const closeLanguagesMenu = () => setLanguagesMenu(null);

  const handleDrawerOpen = () => setSidebarOpen(true);
  const handleDrawerClose = () => setSidebarOpen(false);

  const updateWidth = () => setWidth(window.innerWidth);

  const dummyArray = [1, 2, 3, 4, 5, 6];

  // const showMyNft = account.address !== null;
  const showMyNft = true;
  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  return (
    <>
      {width > MIN_DESKTOP_PX ? (
        // <AppBar position="sticky" className={classes.navbarBackground}>
        <AppBar position="sticky">
          <Toolbar>
            {/* <Link href="/marketplace" className={classes.navbarDesktopMenuButton}> */}
            <Link href="/marketplace">
              {/* <Image className={classes.navbarLogo} src="https://www.mandfhealth.co.uk/wp-content/uploads/2017/12/celebrity-1.jpg" alt="OpenNFT Logo" width="180" height="54" /> */}
              <img
                src="https://www.mandfhealth.co.uk/wp-content/uploads/2017/12/celebrity-1.jpg"
                alt="OpenNFT Logo"
                width="50"
                height="54"
              />
            </Link>
            {/* <Link className={classes.navbarDesktopMenuButton} href="/marketplace"> */}
            <Link href="/marketplace">
              <Button>
                <strong>item0</strong>
              </Button>
            </Link>
            {showMyNft ? (
              <Link className={classes.navbarDesktopMenuButton} href="/mynft">
                <Button>
                  <strong className={classes.navbarDesktopMenuButton}>item 1</strong>
                </Button>
              </Link>
            ) : null}
            {/* {account.address && account.isAdmin ? (
              <Link className={classes.navbarDesktopMenuButton} href="/admin">
                <Button>
                  <strong className={classes.navbarDesktopMenuButton}>item2</strong>
                </Button>
              </Link>
            ) : null} */}
            <div className={classes.navbarGrow} />
            <ConnectButton />
            &nbsp;
            <Button className={classes.languageButton} variant="outlined" onClick={openLanguagesMenu}>
              menu test
            </Button>
            &nbsp;
            <Menu
              id="currency-types"
              anchorEl={languagesMenu}
              keepMounted
              open={Boolean(languagesMenu)}
              onClose={closeLanguagesMenu}
            >
              {/* {Object.entries(ALL_LOCALE_SUPPORTED).map(([key, value]) => { */}
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
              <Link href="/marketplace" className={classes.navbarDesktopMenuButton}>
                <Image
                  className={classes.navbarLogo}
                  src="/logo-large.png"
                  alt="OpenNFT Logo"
                  width="180"
                  height="54"
                />
              </Link>
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
    </>
  );
};

export default Navbar;

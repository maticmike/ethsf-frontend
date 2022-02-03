import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AppBar, Toolbar, Menu, MenuItem, Button, IconButton } from '@material-ui/core';
import clsx from 'clsx';
import consola from 'consola';
import MenuIcon from '@material-ui/icons/Menu';
import { getUserFromEthAddressDb } from '../../../services/api/userService';
import { MIN_DESKTOP_PX } from '../../../constants/ScreenSize';
import { useStyles } from './styles';
import { AccountTree } from '@material-ui/icons';

const Sidebar = dynamic(() => import('../sidebar'), {
  loading: () => <p>Sidebar Loading....</p>,
});
const ConnectButton = dynamic(() => import('../connectbutton'), {
  loading: () => <p>Connect Loading....</p>,
});
const SignupDialog = dynamic(() => import('../../signupDialog'), {
  loading: () => <p>Signup Loading....</p>,
});

const Navbar = () => {
  const classes = useStyles();

  const router = useRouter();

  const { id } = router.query;

  const account = useSelector(state => state.account);

  const [isSignupOpen, setIsOpenSignup] = useState(false);
  const [username, setUsername] = useState(null);

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

  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  useEffect(() => {
    async function getUsernameEthAddress() {
      if (!router.isReady) return;
      let userDb;
      account?.address == null ? null : (userDb = await getUserFromEthAddressDb(account?.address));
      if (userDb === undefined) {
        return <Error statusCode={404} />;
      } else {
        setUsername(userDb.data.payload.username);
      }
    }
    getUsernameEthAddress();
    return () => {
      consola.success('Cleanup profile page');
    };
  }, [account]);

  return (
    <>
      {width > MIN_DESKTOP_PX ? (
        <AppBar position="sticky">
          <Toolbar>
            <a href="/">
              <img
                src="https://www.mandfhealth.co.uk/wp-content/uploads/2017/12/celebrity-1.jpg"
                alt="OpenNFT Logo"
                width="50"
                height="54"
              />
            </a>
            <Link href="/newcampaign" className={classes.navbarDesktopMenuButton}>
              <Button>
                <strong className={classes.navbarDesktopMenuButton}>New Campaign</strong>
              </Button>
            </Link>
            <Link href="/newbounty" className={classes.navbarDesktopMenuButton}>
              <Button>
                <strong className={classes.navbarDesktopMenuButton}>New Bounty</strong>
              </Button>
            </Link>
            {username == null || account?.isLoggedIn === false ? null : (
              <Link className={classes.navbarDesktopMenuButton} href="/profile/[id]" as={`/profile/${username}`}>
                <Button>
                  <strong className={classes.navbarDesktopMenuButton}>My Profile</strong>
                </Button>
              </Link>
            )}
            <div className={classes.navbarGrow} />
            <ConnectButton handleSignupOpen={handleSignupOpen} />
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
      <SignupDialog isSignupOpen={isSignupOpen} handleSignupClose={handleSignupClose} />
    </>
  );
};

export default Navbar;

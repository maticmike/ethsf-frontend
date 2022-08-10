import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import clsx from 'clsx';
import consola from 'consola';
import MenuIcon from '@material-ui/icons/Menu';
import { AppBar, Toolbar, Menu, MenuItem, Button, IconButton } from '@material-ui/core';

import { useStyles } from './styles';
import { AccountTree } from '@material-ui/icons';

const ConnectButton = dynamic(() => import('../connectbutton'), {
  loading: () => <p>Connect Loading....</p>,
});
const SignupDialog = dynamic(() => import('../../signupDialog'), {
  loading: () => <p>Signup Loading....</p>,
});

const Navbar = () => {
  const classes = useStyles();

  const router = useRouter();

  const account = useSelector(state => state.account);

  const [isSignupOpen, setIsOpenSignup] = useState(false);

  const handleSignupOpen = () => setIsOpenSignup(true);
  const handleSignupClose = () => setIsOpenSignup(false);

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <a href="/">
            <Image className={classes.navbarLogo} src="/Logo.png" alt="OpenNFT Logo" width="160" height="80" />
          </a>
          <Link href="/newfund" className={classes.navbarDesktopMenuButton}>
            <Button>
              <strong className={classes.navbarDesktopMenuButton}>Create New Fund</strong>
            </Button>
          </Link>
          {account?.isLoggedIn === false ? null : (
            <Link className={classes.navbarDesktopMenuButton} href="/profile/[id]" as={`/profile/${account.address}`}>
              <Button>
                <strong className={classes.navbarDesktopMenuButton}>My Profile</strong>
              </Button>
            </Link>
          )}
          <div className={classes.navbarGrow} />
          <ConnectButton handleSignupOpen={handleSignupOpen} />
        </Toolbar>
      </AppBar>
      <SignupDialog isSignupOpen={isSignupOpen} handleSignupClose={handleSignupClose} />
    </>
  );
};

export default Navbar;

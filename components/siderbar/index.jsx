import React from 'react';
import {
  Drawer,
  ListItem,
  ListItemIcon,
  ListItemText,
  List,
  Divider,
  Button,
  Menu,
  MenuItem,
  IconButton,
} from '@material-ui/core';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import StorefrontIcon from '@material-ui/icons/Storefront';
import PersonIcon from '@material-ui/icons/Person';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import SettingsInputHdmiIcon from '@material-ui/icons/SettingsInputHdmi';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import LanguageIcon from '@material-ui/icons/Language';
import ConnectButton from '../../components/ConnectButton';
import { useTranslation } from 'next-i18next';

import { useStyles } from './styles';

const Sidebar = ({ isSidebarOpen, closeSidebar, showMyNft, openLanguagesMenu, closeLanguagesMenu, languagesMenu }) => {
  const { t } = useTranslation('common');

  const classes = useStyles();
  const router = useRouter();

  const account = useSelector(state => state.account);

  return (
    <>
      <Drawer
        className={classes.drawer}
        anchor="left"
        variant="persistent"
        open={isSidebarOpen}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Divider />

        <List>
          <ListItem>
            <ListItemIcon>
              {/* TODO for launch, redirect all home page traffic to the marketplace
              future: disable redirect when we actually have the home page content */}
              <Link href="/marketplace">
                <Image className={classes.pointer} src="/logo.png" alt="OpenNFT Logo" width="188" height="58" />
              </Link>
            </ListItemIcon>
            &nbsp;&nbsp;&nbsp;
            <ListItemText>
              <div className={classes.drawerHeader}>
                <IconButton onClick={closeSidebar}>
                  {isSidebarOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
              </div>
            </ListItemText>
          </ListItem>
        </List>
        <Divider />
        <List>
          <Link href="/marketplace">
            <ListItem button key={'marketplace'}>
              <ListItemIcon>
                <StorefrontIcon />
              </ListItemIcon>
              <ListItemText>{t('marketplace')}</ListItemText>
            </ListItem>
          </Link>
          {showMyNft ? (
            <Link href="/mynft">
              <ListItem button key={'nft'}>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText>{t('mynft')}</ListItemText>
              </ListItem>
            </Link>
          ) : null}
          {account.address && account.isAdmin ? (
            <Link href="/admin">
              <ListItem button key={'admin'}>
                <ListItemIcon>
                  <SupervisorAccountIcon />
                </ListItemIcon>
                <ListItemText>{t('admin')}</ListItemText>
              </ListItem>
            </Link>
          ) : null}
        </List>

        <Divider />
        <List>
          <ListItem button key={'connect'}>
            <ListItemIcon>
              <SettingsInputHdmiIcon />
            </ListItemIcon>
            <ConnectButton />
          </ListItem>
          <ListItem button key={'language'}>
            <ListItemIcon>
              <LanguageIcon />
            </ListItemIcon>
            <Button variant="outlined" onClick={openLanguagesMenu}>
              {router.locale === 'en' ? 'EN' : '中文'}
            </Button>
            &nbsp;
            <Menu
              id="currency-types"
              anchorEl={languagesMenu}
              keepMounted
              open={Boolean(languagesMenu)}
              onClose={closeLanguagesMenu}
            >
              <Link href={router.asPath} locale="en">
                <MenuItem onClick={closeLanguagesMenu}>English</MenuItem>
              </Link>
              <Link href={router.asPath} locale="zh_s">
                <MenuItem onClick={closeLanguagesMenu}>简体中文</MenuItem>
              </Link>
            </Menu>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;

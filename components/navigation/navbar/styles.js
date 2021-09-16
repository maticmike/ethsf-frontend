import { makeStyles } from '@material-ui/core/styles';
const drawerWidth = 270;
const useStyles = makeStyles(theme => ({
  navbarRoot: {
    display: 'flex',
  },

  navbarAppBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },

  navbarAppBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  navbarMobileMenuButton: {
    marginRight: theme.spacing(10),
    color: '#C80218',
  },

  navbarLogo: {
    cursor: 'pointer',
  },

  navbarBackground: {
    backgroundColor: '#17161A',
  },

  navbarDesktopMenuButton: {
    color: 'white',
    marginLeft: theme.spacing(4),
    '&:hover': {
      color: 'white',
      textShadow: '0px 0px 10px white, 0 0 30px white, 10px 10px 50px white',
    },
    '& span MuiButtonLabel': {
      wordBreak: 'keep-all',
    },
  },

  navbarGrow: {
    flexGrow: '1',
  },

  navbarItemMobile: {
    color: 'white',
    paddingLeft: '1%',
    cursor: 'pointer',
  },

  navbarSideBar: {
    opacity: '0.99',
    backgroundColor: '#1E1E1E',
    color: 'white',
  },
}));

export { useStyles };

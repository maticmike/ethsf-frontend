import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  NewBounty_box_positioning: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '15%',
  },

  NewBounty_layout_find: {
    width: '450px',
    height: '410px',
    borderRadius: '25px',
    justifyContent: 'center',
    paddingTop: '10%',
  },

  NewBounty_layout_objective: {
    width: '550px',
    height: '400px',
    borderRadius: '25px',
    justifyContent: 'center',
    display: 'flex',
    paddingTop: '3%',
    paddingLeft: '3%',
    paddingRight: '3%',
  },

  NewBounty_layout_dates: {
    width: '730px',
    height: '360px',
    borderRadius: '25px',
    display: 'flex',
    paddingTop: '1%',
    paddingLeft: '1%',
  },

  NewBounty_layout_duration: {
    width: '450px',
    height: '350px',
    borderRadius: '25px',
    paddingTop: '1%',
    paddingLeft: '1%',
  },

  NewBounty_layout_staking: {
    width: '670px',
    height: '300px',
    borderRadius: '25px',
    paddingTop: '1%',
    paddingLeft: '1%',
  },
});

export { useStyles };

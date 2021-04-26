import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  NewCampaign_box_positioning: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '15%',
  },

  NewCampaign_layout_find: {
    width: '450px',
    height: '410px',
    borderRadius: '25px',
    justifyContent: 'center',
    display: 'flex',
    paddingTop: '15%',
  },

  NewCampaign_layout_objective: {
    width: '550px',
    height: '400px',
    borderRadius: '25px',
    justifyContent: 'center',
    display: 'flex',
    paddingTop: '3%',
    paddingLeft: '3%',
    paddingRight: '3%',
  },

  NewCampaign_layout_dates: {
    width: '730px',
    height: '360px',
    borderRadius: '25px',
    display: 'flex',
    paddingTop: '1%',
    paddingLeft: '1%',
  },

  NewCampaign_layout_duration: {
    width: '450px',
    height: '350px',
    borderRadius: '25px',
    paddingTop: '1%',
    paddingLeft: '1%',
  },

  NewCampaign_layout_staking: {
    width: '670px',
    height: '300px',
    borderRadius: '25px',
    paddingTop: '1%',
    paddingLeft: '1%',
  },
});

export { useStyles };

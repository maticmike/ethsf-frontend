import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  SimplePost_box_positioning: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '15%',
  },

  SimplePost_layout: {
    width: '450px',
    height: '300px',
    borderRadius: '25px',
    justifyContent: 'center',
    display: 'flex',
    paddingTop: '10%',
  },

  SimplePost_search: {
    width: '280px',
    borderRadius: '25px',
  },

  SimplePost_error_text: {
    color: 'red',
    fontFamily: 'Arial, Helvetica, sans-serif',
  },

  SimplePost_layout: {
    width: '450px',
    height: '350px',
    borderRadius: '25px',
    justifyContent: 'center',
    display: 'flex',
    paddingTop: '15%',
  },
});

export { useStyles };

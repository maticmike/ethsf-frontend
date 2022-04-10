import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles({
  ProfileHeader_round_img: {
    borderRadius: '50%',
  },
  ProfileHeader_tags_container: {
    display: 'flex',
    gap: '13px',
  },
  ProfileHeader_tags_text: {
    background: '#e4dddd',
    textAlign: 'center',
  },
  ProfileHeader_link_text: {
    textDecoration: 'underline',
    color: 'blue',
  },
  ProfileHeader_cursor: {
    cursor: 'pointer',
  },
});
export { useStyles };

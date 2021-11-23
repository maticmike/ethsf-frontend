import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  Profile_header_container: {
    paddingTop: '1%',
    paddingLeft: '10%',
    paddingRight: '10%',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  },
  Profile_content_container: {
    paddingTop: '1%',
    paddingLeft: '10%',
    paddingRight: '10%',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.08)',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  Profie_cover_flex: {
    display: 'flex',
  },
  Profile_cover_photo: {
    objectFit: 'cover',
    width: '100%',
    height: '200px',
  },
  Profile_round_img: {
    borderRadius: '50%',
  },
  Profile_gridList: {
    width: 900,
    height: 410,
  },
});

export { useStyles };

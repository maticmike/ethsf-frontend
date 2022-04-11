import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { Snackbar } from '@material-ui/core';
import { shortenedEthAddress } from '../../../web3/helpers';
import { useStyles } from './styles';

const ProfileHeader = ({ user }) => {
  const classes = useStyles();

  const [tags, setTags] = useState(['Fitness', 'Clothing', 'Activewear', 'Sports']);
  const [copyText, setCopyText] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText(user?.userEthAddress);
    setCopyText(true);
  };

  return (
    <div>
      <Grid container direction="row">
        <Grid item xs={4}>
          <h2>{user?.username}</h2>
          <p className={classes.ProfileHeader_cursor} onClick={copyAddress}>
            &nbsp;{shortenedEthAddress(user?.userEthAddress)}
          </p>
        </Grid>
        <Grid item xs={3}>
          <p>⭐️⭐️⭐️⭐️</p>
        </Grid>
      </Grid>
      <Grid container direction="row">
        <Grid item xs={4}>
          <p>📍 {user?.location}</p>
        </Grid>
        <Grid item xs={4}>
          <p className={classes.ProfileHeader_link_text}>
            <a href={'mailto:' + user?.email}>Contact</a>
          </p>
        </Grid>
        <Grid item xs={4}>
          <p className={classes.ProfileHeader_link_text}>{user?.website}</p>
        </Grid>
        <Grid item xs={3} className={classes.ProfileHeader_tags_container}>
          {tags.map((tag, index) => (
            <p key={index} className={classes.ProfileHeader_tags_text}>
              {tag}
            </p>
          ))}
        </Grid>
      </Grid>
      <Snackbar
        open={copyText}
        message="Eth Address Copied"
        autoHideDuration={2000}
        onClose={() => setCopyText(false)}
      />
    </div>
  );
};

export default ProfileHeader;

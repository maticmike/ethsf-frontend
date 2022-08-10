import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Grid } from '@material-ui/core';
import { Snackbar } from '@material-ui/core';
import { shortenedEthAddress } from '../../../web3/helpers';
import { useStyles } from './styles';

const ProfileHeader = ({ user }) => {
  const classes = useStyles();
  const router = useRouter();

  const { id } = router.query;

  const [tags, setTags] = useState(['Trust Fund', 'Red Cross', 'St Jude']);
  const [copyText, setCopyText] = useState(false);

  console.log(user, 'the user');

  const copyAddress = () => {
    navigator.clipboard.writeText(user?.userEthAddress);
    setCopyText(true);
  };

  const heading = () => {
    if (user == '0xc5dcac3e02f878fe995bf71b1ef05153b71da8be') {
      return 'Grantor';
    } else {
      return 'Beneficiary';
    }
  };

  return (
    <div>
      <Grid container direction="row">
        <Grid item xs={5}>
          <h2>{heading()}</h2>
          <strong className={classes.ProfileHeader_cursor} onClick={copyAddress}>
            &nbsp;{shortenedEthAddress(id)}
          </strong>
        </Grid>
        <Grid item xs={3}>
          <p>⭐️⭐️⭐️⭐️</p>
        </Grid>
      </Grid>
      <Grid container direction="row">
        <Grid item xs={4}>
          <p>📍 Toronto</p>
        </Grid>
        <Grid item xs={4}>
          <p className={classes.ProfileHeader_link_text}>
            <a href={'mailto:' + 'testmail@info.com'}>Contact</a>
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

import React from 'react';
import Image from 'next/image';
import { Grid } from '@material-ui/core';
import { useStyles } from './styles';

const ProfileHeader = () => {
  const classes = useStyles();

  return (
    <div>
      <Image
        className={classes.ProfileHeader_round_img}
        src="/TestBusiness.png"
        alt="Change Me"
        width="125"
        height="125"
      />
      <Grid container direction="row">
        {/* <Grid item xs={12}>
          <Image
            className={classes.ProfileHeader_round_img}
            src="/TestBusiness.png"
            alt="Change Me"
            width="125"
            height="125"
          />
        </Grid> */}
        <Grid item xs={6}>
          <h4>Gym Shark</h4>
        </Grid>
        <Grid item xs={6}>
          Four Stars
        </Grid>
        <Grid item xs={6}>
          Los Angeles, CA
        </Grid>
        <Grid item xs={6}>
          Joined: Jan, 11 2021
        </Grid>
        <Grid item xs={12}>
          https://gymshark.com
        </Grid>
        <hr />
        <Grid item xs={12}>
          <p>Fitness, Clothing, Activewear, Sports</p>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProfileHeader;

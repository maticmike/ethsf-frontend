import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { useStyles } from './styles';

const ProfileHeader = () => {
  const classes = useStyles();
  const [tags, setTags] = useState(['Fitness', 'Clothing', 'Activewear', 'Sports']);
  return (
    <div>
      <Grid container direction="row">
        <Grid item xs={4}>
          <h2>Gym Shark</h2>
        </Grid>
        <Grid item xs={3}>
          <p>⭐️⭐️⭐️⭐️</p>
        </Grid>
      </Grid>
      <Grid container direction="row">
        <Grid item xs={4}>
          <p>📍 Los Angeles, CA</p>
        </Grid>
        <Grid item xs={4}>
          <p>Joined: Jan 11, 2021</p>
        </Grid>
        <Grid item xs={4}>
          <p>https://gymshark.com</p>
        </Grid>
        <Grid item xs={2} className={classes.ProfileHeader_tags_container}>
          {tags.map((tag, index) => (
            <p key={index} className={classes.ProfileHeader_tags_text}>
              {tag}
            </p>
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default ProfileHeader;

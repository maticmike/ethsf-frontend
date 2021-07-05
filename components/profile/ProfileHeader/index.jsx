import React, { useState } from 'react';
import { Grid } from '@material-ui/core';

import { useStyles } from './styles';

const ProfileHeader = ({ user }) => {
  const classes = useStyles();

  const [tags, setTags] = useState(['Fitness', 'Clothing', 'Activewear', 'Sports']);
  console.log(user, 'the user');
  return (
    <div>
      <Grid container direction="row">
        <Grid item xs={4}>
          <h2>{user.username}</h2>
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
          <p>
            <a href={'mailto:' + user.email}>Send Email</a>
          </p>
        </Grid>
        <Grid item xs={4}>
          <p>{user.website}</p>
        </Grid>
        <Grid item xs={3} className={classes.ProfileHeader_tags_container}>
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

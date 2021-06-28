import React from 'react';
import dynamic from 'next/dynamic';
import { useStyles } from './styles';

const ProfileHeader = dynamic(() => import('../../components/profile/ProfileHeader'), {
  loading: () => <p>Profile Header Loading....</p>,
});

const Profile = () => {
  const classes = useStyles();
  return (
    <div className={classes.Profile_root_padding}>
      <img
        className={classes.Profile_cover_photo}
        src="https://mir-s3-cdn-cf.behance.net/projects/max_808/f7189086626231.Y3JvcCwxMDgwLDg0NCwwLDExNw.png"
      />
      <br />
      <br />
      <ProfileHeader />
    </div>
  );
};

export default Profile;

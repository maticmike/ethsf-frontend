import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useStyles } from './styles';
const InfluencerReviewHeader = () => {
  const classes = useStyles();

  return (
    <div className={classes.InfluencerReview_component_outline}>
      <div>
        <h1 className={classes.InfluencerReview_margin_bottom_h1}>TrackTracy</h1>
        <Link href="https://google.com" target="_blank">
          tracktracy@gmail.com
        </Link>

        <p>
          <strong>1.2M Followers</strong>
        </p>
        <p>
          <strong>480K Subscribers</strong>
        </p>
        <p>
          <strong>700K Followers</strong>
        </p>
      </div>
      <div>
        <Image
          className={classes.InfluencerReview_round_header}
          src="/TestInfluencer.jpeg"
          alt="Change Me"
          width="125"
          height="125"
        />
      </div>
    </div>
  );
};

export default InfluencerReviewHeader;

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { utils } from 'web3';
import { Snackbar, Button } from '@material-ui/core';
import { shortenedEthAddress } from '../../../web3/helpers';
import { useStyles } from './styles';
const BeneficiaryReviewHeader = ({ ethAddress, email, campaignsCompleted }) => {
  const classes = useStyles();

  return (
    <div className={classes.InfluencerReview_component_outline}>
      <div>
        <Link href="/profile/[id]" as={`/profile/${ethAddress}`}>
          <h1 className={classes.InfluencerReview_margin_bottom_h1}>{ethAddress}</h1>
        </Link>

        <h2>luckychild.eth</h2>
        <a href="https://google.com" target="_blank">
          {email}
        </a>
        <p>
          <strong>100 Hours Each Merit Token</strong>
        </p>
        <p>Merit Tokens Earned: 0</p>
      </div>
      <div>
        <Image
          className={classes.InfluencerReview_round_header}
          src="/avatar.png"
          alt="Change Me"
          width="125"
          height="125"
        />
      </div>
    </div>
  );
};

export default BeneficiaryReviewHeader;

// import React, { useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { utils } from 'web3';
// import { Snackbar } from '@material-ui/core';
// import { shortenedEthAddress } from '../../../web3/helpers';
// import { useStyles } from './styles';
// const BeneficiaryReviewHeader = ({ username, email, campaignsCompleted, ethAddress }) => {
//   const classes = useStyles();

//   return (
//     <div className={classes.InfluencerReview_component_outline}>
//       <div>
//         <Link href="/profile/[id]" as={`/profile/${username}`}>
//           <h1 className={classes.InfluencerReview_margin_bottom_h1}>{username}</h1>
//         </Link>

//         <a href="https://google.com" target="_blank">
//           {email}
//         </a>
//         <p>
//           <strong>1.2M Followers</strong>
//         </p>
//         <p>
//           <strong>480K Subscribers</strong>
//         </p>
//         <p>
//           <strong>700K Followers</strong>
//         </p>
//         <p>
//           <i>Campaigns Completed: {campaignsCompleted}</i>
//         </p>
//       </div>
//       <div>
//         <Image
//           className={classes.InfluencerReview_round_header}
//           src="/TestInfluencer.jpeg"
//           alt="Change Me"
//           width="125"
//           height="125"
//         />
//       </div>
//     </div>
//   );
// };

// export default BeneficiaryReviewHeader;

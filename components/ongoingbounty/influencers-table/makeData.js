//TODO REMOVE NAMOR NPM PACKAGE
import namor from 'namor';
import { getUserFromEthAddressDb } from '../../../services/api/userService';

const range = len => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newInfluencer = async () => {
  // influencers.map(influencer => (influencerVar = await getUserFromEthAddressDb(influencer.id)));

  // console.log(influencer, 'the d');

  // influencers.map(influencer => {
  //   getUserFromEthAddressDb(influencer.id).then(influencerRes => {
  //     console.log(influencerRes, ' the res');
  //   });
  // });

  // console.log(influencer, ' influencer in correct spot');

  // console.log(influencer?.id, 'the id');
  // const influencerRes = await getUserFromEthAddressDb(influencer?.id);

  // console.log(influencerRes?.data?.payload?.username, 'the res');

  return {
    // influencerUsername: namor.generate({ words: 1, numbers: 0 }),
    influencerUsername: 'influencerRes?.data?.payload?.username',
    influencerEmail: namor.generate({ words: 1, numbers: 0 }),
    topFollowers: Math.floor(Math.random() * 30),
    topPlatform: Math.floor(Math.random() * 100),
    history: Math.floor(Math.random() * 100),
  };
};

export default function makeData(influencers, ...lens) {
  const makeDataLevel = (depth = 0) => {
    console.log(lens, 'the lens');
    const len = lens[depth];

    return range(len).map(d => {
      // return influencers?.map(influencer => {
      return {
        ...newInfluencer(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}

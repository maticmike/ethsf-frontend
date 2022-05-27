//TODO REMOVE NAMOR NPM PACKAGE

import namor from 'namor';

const range = len => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newInfluencer = () => {
  return {
    // influencerUsername: namor.generate({ words: 1, numbers: 0 }),
    influencerUsername: 'wazy',
    influencerEmail: namor.generate({ words: 1, numbers: 0 }),
    topFollowers: Math.floor(Math.random() * 30),
    topPlatform: Math.floor(Math.random() * 100),
    history: Math.floor(Math.random() * 100),
  };
};

export default function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    return range(len).map(d => {
      return {
        ...newInfluencer(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}

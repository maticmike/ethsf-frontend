import React, { useState, createRef, Fragment, PureComponent } from 'react';
import { FixedSizeGrid as Grid } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';

const LOADING = 1;
const LOADED = 2;
const NUM_COLUMNS = 3;
let itemStatusMap = {};

const isItemLoaded = index => !!itemStatusMap[index];
const loadMoreItems = (startIndex, stopIndex) => {
  for (let index = startIndex; index <= stopIndex; index++) {
    itemStatusMap[index] = LOADING;
  }
  return new Promise(resolve =>
    setTimeout(() => {
      for (let index = startIndex; index <= stopIndex; index++) {
        itemStatusMap[index] = LOADED;
      }
      resolve();
    }, 1000),
  );
};

const Cell = ({ columnIndex, rowIndex, style }) => {
  let label;
  const itemIndex = rowIndex * NUM_COLUMNS + columnIndex;
  if (itemStatusMap[itemIndex] === LOADED) {
    label = `Influencer (${rowIndex})`;
  } else {
    label = 'Loading...';
  }
  return (
    <div className="ListItem" style={style}>
      {label}
    </div>
  );
};

const InfluencersTable = ({ influencers }) => {
  return (
    <Fragment>
      <InfiniteLoader isItemLoaded={isItemLoaded} itemCount={1000} loadMoreItems={loadMoreItems}>
        {({ onItemsRendered, ref }) => (
          <Grid
            className="List"
            columnCount={NUM_COLUMNS}
            columnWidth={140}
            height={250}
            rowCount={100}
            rowHeight={35}
            onItemsRendered={gridProps => {
              onItemsRendered({
                overscanStartIndex: gridProps.overscanRowStartIndex * NUM_COLUMNS,
                overscanStopIndex: gridProps.overscanRowStopIndex * NUM_COLUMNS,
                visibleStartIndex: gridProps.visibleRowStartIndex * NUM_COLUMNS,
                visibleStopIndex: gridProps.visibleRowStopIndex * NUM_COLUMNS,
              });
            }}
            ref={ref}
            width={400}
          >
            {Cell}
          </Grid>
        )}
      </InfiniteLoader>
    </Fragment>
  );
};
export default InfluencersTable;

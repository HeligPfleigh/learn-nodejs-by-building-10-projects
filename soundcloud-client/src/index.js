import React from 'react';
import ReactDOM from 'react-dom';
import TrackList from './components/TrackList';

import {configureStore} from './store';
import * as actions from './actions';

const tracks = [
  {
    id: 1,
    title: 'Em của ngày hôm qua'
  },
  {
    id: 2,
    title: 'Cơn mưa ngang qua'
  }
];

const store = configureStore();
store.dispatch(actions.setTrack(tracks));

ReactDOM.render(
  <TrackList tracks={tracks} />,
  document.getElementById('app')
);
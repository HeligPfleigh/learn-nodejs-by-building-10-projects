import React from 'react';
import ReactDOM from 'react-dom';
import TrackList from './components/TrackList';

const tracks = [
  {
    id:1,
    title: 'Song 1'
  },
  {
    id: 2,
    title: 'Song 2'
  }
];

// =====================================================
ReactDOM.render(
  <TrackList tracks={tracks} />,
  document.getElementById('app')
);
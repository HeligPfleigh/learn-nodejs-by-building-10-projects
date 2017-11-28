import React, {Component, PropTypes} from 'react';

export default class TrackList extends Component {
  static propTypes = {
    tracks: PropTypes.array
  }

  static defaultProps = {
    tracks: []
  }

  render() {
    return (
      <div>
      {
        this.props.tracks.map((track, id) => {
          return <div key={id}>Track: {track.title}</div>;
        })
      }
      </div>
    )
  }
}
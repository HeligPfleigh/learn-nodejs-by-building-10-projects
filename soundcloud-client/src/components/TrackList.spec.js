import TrackList from './TrackList';
import {shallow} from 'enzyme';

describe('TrackList', () => {

  it('shows two tracks', () => {
    const props = {
      tracks: [{ id: 1, title: 'Song A' }, { id: 2, title: 'Song B' }]
    };
    const element = shallow(<TrackList {...props} />);
    expect(element.find('div > div')).to.have.length(2);
  });

  it('shows track title', ()=>{
    const props = {
      tracks: [{id: 1, title: 'Song\'s Name'}]
    };
    const element = shallow(<TrackList {...props} />);
    expect(element.contains('Song\'s Name')).to.be.true;
    
  });

});
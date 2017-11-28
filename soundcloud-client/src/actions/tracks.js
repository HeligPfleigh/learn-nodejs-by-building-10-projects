import {ActionsTypes} from '../core/constants';

export function setTracks(tracks){
    return {
        type: ActionsTypes.TRACKS_SET,
        tracks
    };
}
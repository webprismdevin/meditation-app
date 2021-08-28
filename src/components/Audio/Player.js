import React, {useState, useEffect} from "react";
import useAudio from './useAudio';
import { getFiles } from "./GetTracks";
import { StyleSheet, css } from 'aphrodite';

const Player = (props) => {
    const [track, setTrack] = useState("");
    // eslint-disable-next-line
    const [playing, toggle, audio] = useAudio(track);
    // eslint-disable-next-line
    // const [done, setDone] = useState(false);
    const [trackList, setTrackList] = useState([]);

    const handleEnded = () => {
        toggle();
        console.log("ended");
        props.handleAudioFinished(true);
    }

    useEffect(() => {
      getFiles()
        .then(result => {
          setTrackList(result);
          console.log('fired');
          setTrack(`https://ipfs.io/ipfs/${result[0].cid}/${result[0].name}`)
        })
    }, []);

    //downstream playing prop from app.js
    useEffect(() => {
      toggle(props.playing);
      // eslint-disable-next-line
    }, [props.playing]);

    useEffect(() => {
        audio.addEventListener('ended', () => handleEnded());
        return () => {
          audio.removeEventListener('ended', () => handleEnded());
        };
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [audio]);

      

      return(
        <div className={css(styles.trackSelection)}>
            {/* <button onClick={() => toggle()}>Play</button> */}
            <p><strong>Select your meditation track:</strong></p>
            <select onChange={e => setTrack(e.target.value)}>
              {trackList.map(t => <option key={t.name} value={`https://ipfs.io/ipfs/${t.cid}/${t.name}`}>{t.name}</option>)}
            </select>
        </div>
      )
}

const styles = StyleSheet.create({
    trackSelection: {
      position: 'fixed', 
      top: 10, 
      right: 10, 
      zIndex: 3
    }
});

export default Player;
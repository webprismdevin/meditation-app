import React, {useState, useEffect} from "react";
import useAudio from './components/Audio/useAudio';
import { StyleSheet, css } from 'aphrodite';

const Player = () => {
    const [track, setTrack] = useState("");
    const [playing, toggle, audio] = useAudio(track);
    const [done, setDone] = useState(false);


    const handleEnded = () => {
        toggle();
        console.log("ended");
        setDone(true);
    }

    useEffect(() => {
        audio.addEventListener('ended', () => handleEnded());
        return () => {
          audio.removeEventListener('ended', () => handleEnded());
        };
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [audio]);

      return(
        <div className={css(styles.trackSelection)}>
            <p><strong>Select your meditation track:</strong></p>
            <select onChange={e => setTrack(parseInt(e.target.value))}>
            <option value={0}>Into The Body</option>
            <option value={1}>Rootedness</option>
            <option value={2}>Track 1: Short test (local)</option>
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
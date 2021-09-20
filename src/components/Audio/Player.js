import React, {useState, useEffect} from "react";
import useAudio from './useAudio';
import { getFiles } from "./GetTracks";
// import { StyleSheet, css } from 'aphrodite';

const urlParams = new URLSearchParams(window.location.search);
const mid = urlParams.get('mid');
const name = urlParams.get('name');

const Player = (props) => {
    const [track, setTrack] = useState("");
    // eslint-disable-next-line
    const [playing, toggle, audio] = useAudio(track);
    const [trackList, setTrackList] = useState([]);
    const [webcamOn, setWebcamState] = useState(props.webcamOn);

    // console.log(mid);

    // console.log(props.webcamOn);

    const handleEnded = () => {
        toggle();
        props.handleAudioFinished(true);
    }

    useEffect(() => {
      if(mid === null){
        getFiles()
        .then(result => {
          setTrackList(result);
          setTrack(`https://ipfs.io/ipfs/${result[result.length -1].cid}/${result[result.length -1].name}`);
        })
      }
      if(mid !== null && name !== null){
        setTrack(`https://ipfs.io/ipfs/${mid}/${name}`);
      }
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

      useEffect(() => {
        setWebcamState(props.webcamOn)
      }, [props.webcamOn])

      return(
        // <div className={css(styles.trackSelection)} style={{visibility: webcamOn ? "hidden": "visible"}}>
        //     {/* <button onClick={() => toggle()}>Play</button> */}
        //     <p><strong>Select your meditation track:</strong></p>
        //     <select onChange={e => setTrack(e.target.value)}>
        //       {trackList.map(t => <option key={t.name} value={`https://ipfs.io/ipfs/${t.cid}/${t.name}`}>{t.name}</option>)}
        //     </select>
        // </div>
        <>
        </>
      )
}

// const styles = StyleSheet.create({
//     trackSelection: {
//       position: 'fixed', 
//       top: 10, 
//       right: 10, 
//       zIndex: 3
//     }
// });

export default Player;
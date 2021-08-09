import React, { useState, useEffect } from "react";

const useAudio = (url) => {
  const [audio, setAudio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
      playing ? audio.play() : audio.pause();
    },
    [playing]
  );

  const handleTrackDone = () => {
    setPlaying(false);
  }

  useEffect(() => {
    setAudio(new Audio(url))
  }, [url])

  // useEffect(() => {
  //   audio.addEventListener('ended', () => toggle());
  //   return () => {
  //     audio.removeEventListener('ended', () => toggle());
  //   };
  // }, []);

  return [playing, toggle, audio];
};

// const Player = (url) => {
//   const [playing, toggle] = useAudio(url);

//   return (<div>

//           </div>);
// };

export default useAudio;
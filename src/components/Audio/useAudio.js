import { useState, useEffect } from "react";

const useAudio = (url) => {
  const [audio, setAudio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);
 
  const toggle = () => setPlaying(!playing);

  useEffect(() => {
      playing ? audio.play() : audio.pause();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [playing]
  );


  useEffect(() => {
    setAudio(new Audio(url))
  }, [url])

  return [playing, toggle, audio];
};

export default useAudio;
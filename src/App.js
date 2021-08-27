import React, {useState, useEffect} from "react";
import Webcam from 'react-webcam';
import Onboard from "./components/Onboard/Onboard";
import background from './assets/bkg-min-3.jpg';
import { fadeIn, pulse, fadeOut } from 'react-animations';
import { StyleSheet, css } from 'aphrodite';
import EndForm from "./components/EndForm/EndForm";

import './App.css';

const App = () => {
  const readyIndex = 1;

  const [index, setIndex] = useState(0);
  const [dimensions, setDimensions] = useState({height: window.innerHeight, width: window.innerWidth});
  const [done, setDone] = useState(false);
  const [hasCameraAccess, setCameraAccess] = useState(false);

  const update = () => {
    setDimensions({height: window.innerHeight,width: window.innerWidth})
  };

  useEffect(() => {
    window.addEventListener("resize", update);
  }, []);
  
  let aspect = dimensions.width / dimensions.height;

  const videoConstraints = {
    width: dimensions.width,
    height: dimensions.height,
    aspectRatio: aspect
  }

  return(
    <div className={css(styles.AppWrapper)}>
      <div className={css(index === readyIndex ? styles.fadeIn : '', done && styles.fadeOut)}>
      {index > 0 ? <Webcam 
                                width={videoConstraints.width} 
                                height={videoConstraints.height} 
                                mirrored={true} 
                                className={css(styles.videoCam)}
                                audio={false}  
                                videoConstraints={videoConstraints}
                                onUserMedia={() => setCameraAccess(true)}
                                onUserMediaError={() => setCameraAccess(false)}
                              />
                              :
                              <></>
      }
      </div>
      <div className={css(styles.container, index < readyIndex ? styles.pulse : styles.webCamOnBkg)}></div>
      <div className={css(styles.onboarding, index > 0 && styles.lowerOnboarding, done && styles.raiseOnboarding)}>
        {index < 1 && <button onClick={() => setIndex(index + 1)}>Start</button> }
        {!hasCameraAccess && index > 0 && <div className={css(styles.cameraAccessText)}>Please provide webcam access...</div>}
        {hasCameraAccess && index > 0 && <Onboard 
          incrementIndex={() => setIndex(index + 1)} 
          decrementIndex={() => setIndex(index + 1)} 
          index={index} 
        />}
        {done &&  <EndForm />}
      </div>
      <div className={css(styles.skip, index > 0 ? styles.hide : '')}>
        <span>SKIP →</span>
      </div>
    </div>
  )
}

const styles = StyleSheet.create({
  AppWrapper: {
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
    padding: 0
  },
  pulse: {
    animationName: pulse,
    animationDuration: '4200ms',
    animationIterationCount: 'infinite',
    backgroundImage: `url(${background})`,
    opacity: 0.98,
    height: '110vh',
    width: '110vw',
  },
  webCamOnBkg: {
    height: '110vh',
    width: '110vw',
    backgroundColor: '#333',
    backgroundSize: 'cover',
  },
  fadeIn: {
    animationName: fadeIn,
    animationDuration: '2800ms',
    animationDelay: '800ms',
  },
  fadeOut: {
    animationName: fadeOut,
    animationDuration: '2800ms',
    // animationDelay: '400ms',
    opacity: 0
  },
  container: {
    backgroundSize: 'cover',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    padding: 0,
  },
  onboarding: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    transition: '1200ms transform',
    maxHeight: '100vh',
    overflow: 'hidden'
  },
  lowerOnboarding: {
    transform: 'translateY(40vh)'
  },
  raiseOnboarding: {
    transform: 'translateY(0vh)'
  },
  videoCam: {
    position: 'fixed',
    top: '0',
    left: '0',
    zIndex: 1
  },
  skip: {
    position: 'fixed',
    bottom: 10,
    right: 10,
    zIndex: 2
  },
  hide: {
    visibility: 'hidden'
  },
  trackSelection: {
    position: 'fixed', 
    top: 10, 
    right: 10, 
    zIndex: 3
  },
  cameraAccessText: {
    color: 'white'
  }
});

export default App;

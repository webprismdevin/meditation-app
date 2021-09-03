/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from "react";
import Webcam from 'react-webcam';
import background from './assets/bkg-min-3.jpg';
import { fadeIn, pulse, fadeOut } from 'react-animations';
import { StyleSheet, css } from 'aphrodite';
import EndForm from "./components/EndForm/EndForm";
import SkipButton from "./components/SkipButton";
import Onboard2 from "./components/Onboard/Onboard2";
import StartButton from "./components/StartButton";
import RequestCameraAccess from "./components/RequestCameraAccess";
import Player from "./components/Audio/Player";
import SwitchCamera from './cameraswitch_black.svg'
import './App.css';

const App = () => {
  const [dimensions, setDimensions] = useState({height: window.innerHeight, width: window.innerWidth});
  const [ready, setReady] = useState(false);
  const [done, setDone] = useState(false);
  const [onboardingVisibility, setOnboardingVisibility] = useState(false);
  const [skipVisibility, setSkipVisibility] = useState(true);
  const [showStartButton, toggleStartButton] = useState(true);
  const [accessNeeded, showAccessNeeded] = useState(false);
  const [showWebcam, toggleShowWebcam] = useState(false);
  const [cameraAccess, setCameraAccess] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [meditationFinished, setMeditationFinished] = useState(false);
  // const [deviceId, setDeviceId] = React.useState({});
  const [devices, setDevices] = useState([]);
  const [activeCamera, setActiveCamera] = useState(0)

  //handle multiple webcams
  const handleDevices = React.useCallback(
    mediaDevices =>
      setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
    [setDevices]
  );

  useEffect(
    () => {
      navigator.mediaDevices.enumerateDevices().then(handleDevices);
    },
    [handleDevices]
  );

  useEffect(() => {
    if(devices.length > 0) setActiveCamera(0)
  },[devices]);

  const cycleCamera = () => {
    if(activeCamera < devices.length - 1) setActiveCamera(activeCamera => activeCamera + 1)
    else setActiveCamera(0);

    // console.log(devices[activeCamera].deviceId);
  }

  const update = () => {
    setDimensions({height: window.innerHeight,width: window.innerWidth});
  };

  useEffect(() => {
    window.addEventListener("resize", update);
  }, []);
  
  let aspect = dimensions.width / dimensions.height;

  const videoConstraints = {
    width: dimensions.width,
    height: dimensions.height,
    aspectRatio: aspect,
    deviceId: devices.length > 0 ? devices[activeCamera].deviceId : null
  }

  const handleGotWebcamAccess = () => {
    showAccessNeeded(false);
    setReady(true);
    if(done === false){
      setOnboardingVisibility(true);
    }
  }

  const handleStart = () => {
    toggleShowWebcam(true);
    toggleStartButton(false);
    //need to fix flashing on load
    if(cameraAccess === false) showAccessNeeded(true);
  }

  const toggleReady = (bool) => {
    setReady(ready => !ready)
    //fires after onboarding is finished, hide onboarding, and start the audio track
    if(bool === 1){
      setOnboardingVisibility(onboardingVisibility => !onboardingVisibility);
      setDone(true);
      setPlaying(true);
    }
  }

  const handleAudioFinished = (data) => {
    // console.log(data);
    setMeditationFinished(data);
  }

  return(
    <div className={css(styles.AppWrapper)}>
      <Player playing={playing} handleAudioFinished={(data) => handleAudioFinished(data)}/>
      {showWebcam && <Webcam 
                                width={videoConstraints.width} 
                                height={videoConstraints.height} 
                                mirrored={true} 
                                className={css(styles.videoCam, styles.fadeIn, 
                                  meditationFinished && styles.fadeOut
                                )}
                                audio={false}  
                                videoConstraints={videoConstraints}
                                onUserMedia={() => handleGotWebcamAccess()}
                              />
      }
      {/* pulsing background */}
      <div className={css(styles.container, styles.pulse)}>
      </div>
      <div className={css(styles.onboarding)}>
        <div className="flex flex-col items-center" style={{display: showStartButton ? "inherit":"none"}}>
          <h1>Welcome to your daily moment...</h1>
          <StartButton 
            show={showStartButton} 
            handleStart={handleStart}
          />
        </div>
        <Onboard2 show={onboardingVisibility} ready={ready} toggleReady={(b) => toggleReady(b)}/>
        <RequestCameraAccess show={accessNeeded}/>
        {meditationFinished &&  <EndForm />}
        <button onClick={cycleCamera} style={{ position: 'fixed', bottom: 10, left: 10, zIndex: 2}}>
          <img src={SwitchCamera} alt="Switch Camera"/>
        </button>
      </div>
      {/* <SkipButton show={skipVisibility}/> */}
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
    backgroundSize: '2800px 1200px',
    backgroundPosition: 'center',
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
  },
  fadeOut: {
    animationName: fadeOut,
    animationDuration: '2200ms',
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
  videoCam: {
    position: 'fixed',
    top: '0',
    left: '0',
    zIndex: 1
  }
});

export default App;

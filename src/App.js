import React from "react";
import Webcam from 'react-webcam';
import Onboard from "./components/Onboard/Onboard";
import background from './assets/bkg-min-3.jpg';
import { fadeIn, pulse } from 'react-animations';
import { StyleSheet, css } from 'aphrodite';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      index: 0,
      height: window.innerHeight,
      width: window.innerWidth
    }
  }

  increment = () => {
    this.setState({index: this.state.index + 1});
  }

  decrement = () => {
    if(this.state.index > 0){
      this.setState({index: this.state.index -1})
    }
  }

  componentDidMount(){
    window.addEventListener("resize", this.update);
  }

  update = () => {
    this.setState({
      height: window.innerHeight,
      width: window.innerWidth
    })
  };

  render(){
    let index = this.state.index;
    let aspect = this.state.width / this.state.height;
    let readyIndex = 1;

    const videoConstraints = {
      width: this.state.width,
      height: this.state.height,
      aspectRatio: aspect
    }

    return(
      <div className={css(styles.AppWrapper)}>
        <div className={index === readyIndex ? css(styles.fadeIn) : ''}>
        {index > 0 ? <Webcam 
                                  width={videoConstraints.width} 
                                  height={videoConstraints.height} 
                                  mirrored={true} 
                                  className={css(styles.videoCam)}
                                  audio={false}  
                                  videoConstraints={videoConstraints}
                                />
                                  : <></>
        }
        </div>
        <div className={css(styles.container, index < readyIndex ? styles.pulse : styles.webCamOnBkg)}></div>
        <div className={css(styles.onboarding, index > 0 ? styles.lowerOnboarding : '')}>
          <Onboard incrementIndex={this.increment} decrementIndex={this.decrement} index={index} />
        </div>
        <div className={css(styles.skip, index > 0 ? styles.hideSkip : '')}>
          <span>SKIP →</span>
        </div>
      </div>
    )
  }
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
    animationDelay: '400ms',
  },
  container: {
    backgroundSize: 'cover',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    padding: 0
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
    transition: '1200ms transform'
  },
  lowerOnboarding: {
    transform: 'translateY(40vh)'
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
  hideSkip: {
    visibility: 'hidden'
  }
});

export default App;

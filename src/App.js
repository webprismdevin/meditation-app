import React from "react";
import Webcam from 'react-webcam';
import Onboard from "./components/Onboard";
import background from './assets/bkg-min-3.jpg';
import { fadeIn, pulse } from 'react-animations';
import { StyleSheet, css } from 'aphrodite';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      ready: false,
      index: 0,
      height: window.innerHeight,
      width: window.innerWidth
    }

    window.addEventListener("resize", this.update);
  }

  increment = () => {
    this.setState({index: this.state.index + 1})
  }

  decrement = () => {
    if(this.state.index > 0){
      this.setState({index: this.state.index -1})
    }
  }

  update = () => {
    this.setState({
      height: window.innerHeight,
      width: window.innerWidth
    });
  };

  render(){
    console.log(this.state.width, this.state.height)

    return(
      <div className={css(styles.AppWrapper)}>
        {this.state.index > 4 ? <Webcam width={this.state.width} height={this.state.height} mirrored={true} className={css(styles.videoCam)} /> : <></>}
        <div className={css(styles.container, styles.pulse)}></div>
        <div className={css(styles.onboarding)}>
          <Onboard incrementIndex={this.increment} decrementIndex={this.decrement} index={this.state.index} />
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
  },
  pulse: {
    animationName: pulse,
    animationDuration: '4200ms',
    animationIterationCount: 'infinite'
  },
  fadeIn: {
    animationName: fadeIn,
    animationDuration: '1800ms'
  },
  container: {
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    opacity: 0.98,
    height: '110vh',
    width: '110vw',
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
    zIndex: 2
  },
  videoCam: {
    position: 'fixed',
    top: '0',
    left: '0',
    zIndex: 1
  }
});

export default App;

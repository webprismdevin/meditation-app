import React from "react";
import Webcam from 'react-webcam';
import Onboard from "./components/Onboard";
import background from './assets/bkg-min.jpg';
import { pulse } from 'react-animations';
import { StyleSheet, css } from 'aphrodite';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      ready: false,
      index: 0
    }
  }

  increment = () => {
    this.setState({index: this.state.index + 1})
  }

  render(){
    return(
      <div>
        <div className={css(styles.pulse)}>
          <div className={"h-screen flex flex-col justify-center items-center " + css(styles.container)}>
          <div className={css(styles.videoCam)} >
            {this.state.index > 0 ? <Webcam mirrored={true} /> : null}
          </div>
            <div className={"text-center " + css(styles.onboarding)} >
              <Onboard incrementIndex={this.increment} index={this.state.index}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const styles = StyleSheet.create({
  pulse: {
    animationName: pulse,
    animationDuration: '3800ms',
    animationIterationCount: 'infinite'
  },
  container: {
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover'
  },
  onboarding: {
    zIndex: 0,

  },
  videoCam: {

  }
});

export default App;

import React from "react";
import Webcam from 'react-webcam';
import Onboard from "./components/Onboard";
import background from './assets/bkg-min.jpg';
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
      <div className="h-screen flex flex-col items-center justify-center" style={{backgroundImage: `url(${background})`, backgroundSize: 'cover'}}>
        <div className="fixed top-0" style={{zIndex: 0}}>
          {this.state.index > 0 ? <Webcam /> : null}
        </div>
        <div className="text-center" style={{backgroundColor: this.state.ready === true ? "black" : "white", zIndex: 1}}>
          <Onboard incrementIndex={this.increment} index={this.state.index}/>
        </div>
      </div>
    )
  }
}

export default App;

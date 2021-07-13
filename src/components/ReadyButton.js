import React from 'react';
import FadeIn from 'react-fade-in';

class ReadyButton extends React.Component {
    render(){
      let button_styles = "rounded-md border border-gray-300 pt-4 pb-4 pr-16 pl-16 mb-16 animate-pulse";
      
      return(
        <FadeIn delay={200} transitionDuration={1200}>
          <button className={button_styles} onClick={this.props.getReady}>Ready?</button>
        </FadeIn>
      )
    }
}

export default ReadyButton
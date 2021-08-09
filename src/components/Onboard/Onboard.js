import React from 'react';
import NavButton from './NavButton';
import Slide2 from './Slide2';

export default class Onboard extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            index: this.props.index,
            ready: false
        }
    }

    handleStart = () => {
        this.props.incrementIndex();
        this.setState({
            index: this.state.index + 1,
            ready: true
        });
    }

    returnButtonText = (index) => {
        switch(index === true){
            case (this.buttonText !== undefined):
                return this.buttonText[index]
            default:
                return 'Next →'
        }
    }

    stopCount = () => {
        this.setState({
            ready: false
        });
    }

    incrementIndex = () => {
        this.setState({
            index: this.state.index + 1
        }, () => {
            if(this.state.index > this.slides.length){
                this.stopCount();
            } else {
                this.props.incrementIndex();
            }
        })
    }

    slides = [
        "It only takes 2 minutes to reset your mind...",
        "let's focus on you for a moment",
        "You will be listening to a guided meditation. There will be no text to read...",
        // "The purpose is to look at yourself, like a mirror.",
        // "Connect with yourself."
    ];

    render(){
        return(
            <div className="p-4 flex flex-col items-center">
                <Slide2 slides={this.slides} index={this.state.index} className="text-white" ready={this.state.ready} incrementIndex={this.incrementIndex}/>
                {this.state.index < 1 ? <NavButton className="ml-2" buttonText={"Start →"} callBack={this.handleStart}/> : <></>}
            </div>
        )
    }
}

/* 

    hour count so far:
    6 hours

    next steps: 
    - add audio track once recieved
    - add select option if multiple tracks
    - prototype styles & implement

*/
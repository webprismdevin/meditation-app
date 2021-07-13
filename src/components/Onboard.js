import React from 'react';

const Slide1 = (props) => {
    return(
        <div>
            <p>Welcome.</p>
            <p>None of this is recorded.</p>
        </div>
    )
}

const Slide2 = (props) => {
    return (
        <div>
            <span>Take a moment for you.</span>
        </div>
    )
}

export default class Onboard extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            index: props.index
        }
    }

    handleNext = () => {
        this.props.incrementIndex();
        this.setState({
            index: this.state.index + 1
        })
    }

    handlePrevious = () => {
        if(this.state.index > 0){
            this.setState({
                index: this.state.index - 1
            })
        }
    }

    render(){
        let components = [  <Slide1/>, 
                            <Slide2 />,
                            <span>Can you see yourself?</span>,
                            <span>Press "Next" to get started.</span>
                        ]

        return(
            <div className="p-4">
                <div>{components[this.state.index]}</div>
                <div className="animate-pulse">{this.state.index >= 1 ? <button onClick={this.handlePrevious}>Prev</button> : null}<span> </span><button onClick={this.handleNext}>Next</button></div>
            </div>
        )
    }
}

/* 

    hour count so far:
    4 hours

    next steps: 
    - add audio track once recieved
    - add select option if multiple tracks
    - prototype styles & implement

*/
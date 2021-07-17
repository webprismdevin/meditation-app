import React from 'react';

const Slide = (props) => {
    return(
        <div>
            {props.content}
        </div>
    )
}

const NavButton = (props) => {

}

export default class Onboard extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            index: props.index
        }
    }

    buttonText = [
        'Start →',
        'Next',
    ]

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

    returnButtonText = (index) => {
        switch(index === true){
            case (this.buttonText !== undefined):
                return this.buttonText[index]
            default:
                return 'Next →'
        }
    }

    render(){
        let slides = [
            "It only takes 2 minutes to reset your mind...",
            "let's focus on you for a moment",
            ""
        ]

        return(
            <div className="p-4">
                <div><Slide content={slides[this.state.index]} /></div>
                <div>{this.state.index >= 1 ? <button className="mt-4 pl-4 pr-4 pt-2 pb-2 bg-white" onClick={this.handlePrevious}>Prev</button> : null}<span> </span>
                        <button className="mt-4 pl-4 pr-4 pt-2 pb-2 bg-white" onClick={this.handleNext}>{this.returnButtonText(this.state.index)}</button>
                    </div>
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
import React from 'react';

const Slide = (props) => {
    return(
        <div className={props.className}>
            {props.content}
        </div>
    )
}

const NavButton = (props) => {
    return (
        <button onClick={props.callBack} className={`mt-4 pl-4 pr-4 pt-2 pb-2 bg-white ${props.className}`}>{props.buttonText}</button>
    )
}

export default class Onboard extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            index: props.index
        }
    }

    buttonText = [
        'Start →'
    ]

    handleNext = () => {
        this.props.incrementIndex();
        this.setState({
            index: this.state.index + 1
        })
    }

    handlePrevious = () => {
        this.props.decrementIndex();
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
            "You will be listening to a guided meditation. There will be no text to read...",
            "The purpose is to look at yourself, like a mirror.",
            "Connect with yourself."
        ]

        return(
            <div className="p-4 flex flex-col items-center">
                <Slide className="text-white" content={slides[this.state.index]} />
                <div>{this.state.index >= 1 ? <NavButton className="mr-2" buttonText="← Prev" callBack={this.handlePrevious} /> : null}
                    <NavButton className="ml-2" buttonText="Next →" callBack={this.handleNext}/>
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
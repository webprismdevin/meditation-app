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

const Navigation = (props) => {
    let buttonText = [
        'Start →',
        'Next →',
        'Next →',
        'Next →',
        'Ready?'    
    ];
    
    return(
        <div>{props.index >= 1 ? <NavButton className="mr-2" buttonText="← Prev" callBack={props.handlePrevious} /> : null}
            <NavButton className="ml-2" buttonText={buttonText[props.index]} callBack={props.handleNext}/>
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
        ];

        let index = this.state.index;

        return(
            <div className="p-4 flex flex-col items-center">
                <Slide className="text-black" content={slides[index]} />
                {index <= 4 ? <Navigation handlePrevious={this.handlePrevious} handleNext={this.handleNext} index={index} /> : <></>}

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
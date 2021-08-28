import React, {useEffect, useState} from 'react';

const slides = [
    "It only takes 2 minutes to reset your mind...",
    "let's focus on you for a moment",
    "You will be listening to a guided meditation.",
    "There will be no text to read...",
    "Deep breath..."
];

const Onboard2 = (props) => {
    const [visibility, setVisibility] = useState(props.show);
    const [intervalId, setIntervalId] = useState(0);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if(props.ready === false){
            clearInterval(intervalId);
            return;
        }

        if(props.ready){
            const id = setInterval(() => {
                setIndex(index => index + 1);
            }, 3600);
            setIntervalId(id);
        }
        // eslint-disable-next-line
    }, [props.ready]);

    useEffect(() => {
        if(index >= slides.length) props.toggleReady(1);
        // eslint-disable-next-line
    }, [index])


    useEffect(() => {
        setVisibility(props.show);
    }, [props.show]);
    
    return(
        <div onClick={() => props.toggleReady()} style={{display: visibility ? 'inherit': 'none', color: 'white', backgroundColor: 'rgba(0,0,0,0.6)', padding: 12, borderRadius: 3}}>
            <p>{slides[index]}</p>
        </div>
    )
}

export default Onboard2;
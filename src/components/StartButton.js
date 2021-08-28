import React, {useEffect, useState} from 'react';

const StartButton = (props) => {
    // eslint-disable-next-line
    const [visibility, setVisibility] = useState(props.show);

    useEffect(() => {
        setVisibility(props.show);
    }, [props.show])

    return(
        <button 
            style={{display: visibility ? 'inherit' : 'none'}}
            onClick={() => props.handleStart()}
        >Start</button>
    )
}

export default StartButton;
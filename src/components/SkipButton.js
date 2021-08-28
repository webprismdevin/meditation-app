import React, {useState} from "react";

const SkipButton = (props) => {
    // eslint-disable-next-line
    const [visibility, setVisibility] = useState(props.show)

    return(
        // eslint-disable-next-line no-sequences
        <div style={{ position: 'fixed', bottom: 10, right: 10, zIndex: 2, display: visibility ? 'inherit': 'none'}}>
            <a href="https://thedailymoment.com">SKIP →</a>
        </div>
    )
}

export default SkipButton;
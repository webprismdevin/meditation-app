import { useEffect, useState } from "react";

const Slide2 = (props) => {
    const [intervalId, setIntervalId] = useState(0);

    useEffect(() => {
        if(props.ready === false){
            clearInterval(intervalId)
            return;
        }

        if(props.ready){
            const id = setInterval(() => {
                props.incrementIndex();
            }, 3600);
            setIntervalId(id);
        }
    // eslint-disable-next-line
    }, [props.ready])

    return(
        <div className={props.className}>
            {props.slides[props.index]}
        </div>
    )
}

export default Slide2;
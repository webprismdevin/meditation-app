import React from "react";

const useInterval = (callback, delay) => {
    const intervalId = React.useRef(null);
    const savedCallback = React.useRef(callback);
  
    React.useEffect(() => {
      savedCallback.current = callback;
    });
  
    React.useEffect(() => {
      const tick = () => savedCallback.current();
  
      if (typeof delay === "number") {
        intervalId.current = window.setInterval(tick, delay);
  
        return () => window.clearInterval(intervalId.current);
      }
    }, [delay]);
  
    return intervalId.current;
};

// eslint-disable-next-line 
const Stopwatch = () => {
    const [status, setStatus] = React.useState("idle");
    const [timeElapsed, setTimeElapsed] = React.useState(0);
  
    useInterval(
      () => {
        setTimeElapsed(timeElapsed => timeElapsed + 1);
      },
      status === "running" ? 1000 : null
    );
  
    const toggle = () => {
      setTimeElapsed(0);
      setStatus(status => (status === "running" ? "idle" : "running"));
    };
  
    return (
      <>
        Time Elapsed: {timeElapsed} second(s)
        <br />
        <button onClick={toggle}>
          {status === "running" ? "Stop" : "Start"}
        </button>
      </>
    );
  };

export default useInterval;
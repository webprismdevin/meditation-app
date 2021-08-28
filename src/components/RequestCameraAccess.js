import React, { useEffect, useState } from 'react';

const RequestCameraAccess = (props) => {
    const [visibility, setVisibility] = useState(props.show)

    useEffect(() => {
        setVisibility(props.show);
    }, [props.show])

    return(
        <div className="text-white" style={{display: visibility ? "inherit":"none"}}>Please provide webcam access...</div>
    )
}

export default RequestCameraAccess;
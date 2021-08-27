import React, {useState, useEffect} from 'react';

const EndForm = () => {
    const [feel, setFeel] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(feel);
    }

    return(
        <form onSubmit={handleSubmit} name="feelform">
            <input type="text" placeholder="in one word, describe how you feel." onChange={e => setFeel(e.target.value)} value={feel} style={{width: '300px', padding: 8}}/>
        </form>
    )
}

export default EndForm;
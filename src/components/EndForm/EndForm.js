import React, {useState} from 'react';

const EndForm = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [formReceived, setFormReceived] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`https://hooks.zapier.com/hooks/catch/2575639/b49z4ki?name=${name}&email=${email}`)
        .then(result => {
            console.log(result)
            if(result.status === 200) setFormReceived(true);

        })
    }

    return(
        <div name="emailform">
            {!formReceived &&
            <div>
                <input type="text" placeholder="Enter your email to be notified of new meditations..." onChange={e => setEmail(e.target.value)} value={email} style={{width: '420px', padding: 8, borderRadius: 3}}/>
                {email !== "" && <div className="flex " style={{width: '420px', marginTop: 8}}>
                                    <input onChange={e => setName(e.target.value)} placeholder="First name" style={{padding: 8, borderRadius: 3}}/>
                                    <button onClick={handleSubmit} style={{backgroundColor: 'white', padding: 8, marginLeft: 8, borderRadius: 3}}>Submit</button>
                                </div>
                }
            </div>
            }
            {formReceived && 
                <div style={{textAlign: 'center'}}>
                    <p>Thank you for subscribing. We'll keep you updated as new meditations are released.</p>
                    <a href="https://thedailymoment.com">Go to TheDailyMoment.com</a>
                </div>
            }
        </div>
    )
}

export default EndForm;
import React, {useState} from 'react';
import axios from "axios";

function Form(props) {
    const [name, setName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [sent, setSent] = useState(false);


    //handle inputs
    const handleChangeInput = e => {
        const {name, value} = e.target
        switch (name) {
            case "name":
                setName(value);
                break;
            case "lastname":
                setLastName(value);
                break;
            case "email":
                setEmail(value);
                break;
            case "message":
                setMessage(value);
                break;
            default:
                return;
        }
    }
    // end of handle inputs


    const formSubmit = e => {
        e.preventDefault();

        let data = {
            name,
            lastname,
            email,
            message
        }

        axios.post('/api/forma', data)
            .then(res => {
                setSent(true)
                setName('');
                setLastName('');
                setEmail('');
                setMessage('');
                setTimeout(() => {
                    setSent(false);
                }, 3000)

            }).catch(() => {
            console.log("message not sent")
        })
    }

    // for reseting initial data


    return (
        <div className="container">
            <form onSubmit={formSubmit}>
                {/*single item*/}
                <div className="singleItem">
                    <label htmlFor="name">name</label>
                    <input type="text" name="name" className="name" placeholder="your name..."
                           value={name}
                           onChange={handleChangeInput}/>
                </div>
                {/*end of single item */}
                {/*single item*/}
                <div className="singleItem">
                    <label htmlFor="lastname">lastname</label>
                    <input type="text" name="lastname" className="lastname" placeholder="your lastname..."
                           value={lastname}
                           onChange={handleChangeInput}/>
                </div>
                {/*end of single item */}
                {/*single item*/}
                <div className="singleItem">
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" className="name" placeholder="your email..."
                           value={email}
                           onChange={handleChangeInput}
                           required/>
                </div>
                {/*end of single item */}{/*single item*/}
                <div className="textArea singleItem">
                    <label htmlFor="message">Message</label>
                    <textarea name="message" id="" cols="30" rows="5" placeholder="your message..."
                              value={message}
                              onChange={handleChangeInput}>
                    </textarea>
                </div>
                {/*end of single item */}
                <div className={sent ? 'msg msgAppear' : 'msg'}>Message has been sent</div>

                <div className="btn">
                    <button type="submit" onSubmit={formSubmit}>Submit</button>
                </div>


            </form>
        </div>
    );
}

export default Form;
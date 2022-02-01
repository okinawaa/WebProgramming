import React, {useState} from 'react';
import styled from 'styled-components';
import axios from "axios";

function ContactPage() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [sent, setSent] = useState(false);

    //handle inputs
    const handleChangeInput = e => {
        const {name, value} = e.target
        switch (name) {
            case "name":
                setName(value);
                break;
            case "email":
                setEmail(value);
                break;
            case "subject":
                setSubject(value);
                break;
            case "message":
                setMessage(value);
                break;
            default:
                return;
        }
    }

    const formSubmit = e => {
        e.preventDefault();

        let data = {
            name,
            subject,
            email,
            message
        }
        console.log(data)

        axios.post('/api/form', data)
            .then(res => {
                setSent(true)
                setName('');
                setSubject('');
                setEmail('');
                setMessage('');
                setTimeout(() => {
                    setSent(false);
                }, 3000)
            }).catch(() => {
            console.log("message not sent")
        })
    }


    return (
        <ContactPageStyled>
            <div className="content-container">
                <div className="contact-title">
                    <h4>CONTACT</h4>
                </div>
                <form className="form" onSubmit={formSubmit}>
                    <div className="form-field">
                        <label htmlFor="name">Enter your name*</label>
                        <input type="text" name="name" id="name" value={name} onChange={handleChangeInput}/>
                    </div>
                    <div className="form-field">
                        <label htmlFor="email">Enter your email*</label>
                        <input type="email" name="email" id="email" value={email} onChange={handleChangeInput}/>
                    </div>
                    <div className="form-field">
                        <label htmlFor="subject">Enter your subject</label>
                        <input type="text" name="subject" id="subject" value={subject}
                               onChange={handleChangeInput}/>
                    </div>
                    <div className="form-field">
                        <label htmlFor="text-area">Enter your Message*</label>
                        <textarea  name="message" id="textarea" value={message}
                                  onChange={handleChangeInput}
                                  cols="30" rows="10"/>
                    </div>
                    {
                        sent ?
                            <div className="success-message">
                                <span>Email Sent Success</span>
                            </div>
                            :

                            <div className="form-field f-button" onClick={formSubmit}>
                                <button>asdasdadbutton</button>
                            </div>

                    }
                </form>
            </div>
        </ContactPageStyled>
    )
}

const ContactPageStyled = styled.section`
  height: 100vh;
  overflow: hidden;
  background-color: dodgerblue;
  width: 100%;
  .content-container{
    margin-top: 6vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .contact-title{

      h4{
        font-size: 3rem;
      }
    }

    .form {
      width: 80%;
      .form-field {
        margin-top: 2rem;
        position: relative;
        width: 100%;
        label {
          position: absolute;
          left: 20px;
          top: -10px;
          display: inline-block;
          background-color: dodgerblue;
          padding: 0 .5rem;
          color: inherit;
        }
        input {
          border: 1px solid black;
          outline: none;
          background: transparent;
          height: 50px;
          padding: 0 15px;
          width: 100%;
          color: inherit;
        }
        textarea {
          background-color: transparent;
          border: 1px solid black;
          outline: none;
          color: inherit;
          width: 100%;
          padding: .8rem 1rem;
        }
        .f-button{
          cursor: pointer;
        }
      }
    }
    .success-message {
      width: 100%;
      height: 100%;
      display: flex;
      justify-self: center;
      margin: 2rem 0;
      span {
        width: 100%;
        height: 100%;
        text-align: center;
        font-size: 2rem;
      }
    }
  }
  
`;

export default ContactPage
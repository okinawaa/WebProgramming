import React, {useState} from 'react';
import styled from 'styled-components';
import {MainLayout, InnerLayout} from '../styles/Layouts';
import Title from '../Components/Title';
import PrimaryButton from '../Components/PrimaryButton';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ContactItem from '../Components/ContactItem';
import axios from "axios";

function ContactPage() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [sent, setSent] = useState(false);

    const phoneIcon = <PhoneIcon/>
    const emailIcon = <EmailIcon/>
    const locationIcon = <LocationOnIcon/>

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
        <MainLayout>
            <Title title={'Contact'} span={'Contact'}/>
            <ContactPageStyled>
                <InnerLayout className={'contact-section'}>
                    <div className="left-content">
                        <div className="contact-title">
                            <h4>Shout at me</h4>
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
                                <textarea name="message" id="textarea" value={message}
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
                                        <PrimaryButton title={'PUSH Anytime'}/>
                                    </div>

                            }
                        </form>
                    </div>
                    <div className="right-content">
                        <ContactItem title={'Phone'} icon={phoneIcon} cont1={'+82-034928993'} cont2={'01034928993'}/>
                        <ContactItem title={'Email'} icon={emailIcon} cont1={'pgg6713@gmail.com'}
                                     cont2={'chanhyuk-tech@kakao.com'}/>
                        <ContactItem title={'Address'} icon={locationIcon} cont1={'Dongtan'}
                                     cont2={'Republic Of Korea'}/>

                    </div>
                </InnerLayout>
            </ContactPageStyled>
        </MainLayout>
    )
}

const ContactPageStyled = styled.section`
  .contact-section {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 2rem;
    @media screen and (max-width: 978px) {
      grid-template-columns: repeat(1, 1fr);
      .f-button {
        margin-bottom: 3rem;
      }
    }

    .right-content {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      @media screen and (max-width: 502px) {
        width: 70%;
      }
    }

    .contact-title {
      h4 {
        color: var(--white-color);
        padding: 1rem 0;
        font-size: 1.8rem;
      }
    }

    .form {
      width: 100%;
      @media screen and (max-width: 502px) {
        width: 100%;
      }

      .form-field {
        margin-top: 2rem;
        position: relative;
        width: 100%;

        label {
          position: absolute;
          left: 20px;
          top: -19px;
          display: inline-block;
          background-color: var(--background-dark-color);
          padding: 0 .5rem;
          color: inherit;
        }

        input {
          border: 1px solid var(--border-color);
          outline: none;
          background: transparent;
          height: 50px;
          padding: 0 15px;
          width: 100%;
          color: inherit;
        }

        textarea {
          background-color: transparent;
          border: 1px solid var(--border-color);
          outline: none;
          color: inherit;
          width: 100%;
          padding: .8rem 1rem;
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
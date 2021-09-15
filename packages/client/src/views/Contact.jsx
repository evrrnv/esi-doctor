import React from 'react';
import SideBar from '../components/layout/sideBar';
import '../assets/css/contact.css'
import contact from '../assets/images/contact.svg'
import { TextField } from '@material-ui/core';
import howlers from '../assets/images/howlers.png'
import viber from '../assets/images/viber.svg'
import fcbk from '../assets/images/fcbk.svg'
import telegram from '../assets/images/telegram.svg'
import linkedin from '../assets/images/linkedin.svg'
import wtsp from '../assets/images/wtsp.svg'



const Contact = () => {
    return (
        <div className="contact__main">
            <SideBar/>
            <div className="contact__content">
                <div className="contact__header d-flex">
                    <img className="contact__header__icon" src={contact} alt="" />
                    <h1 className="contact__header__txt">Contactez-nous</h1>
                </div>
                <div className="contact__body d-flex flex-column mt-4">
                   <TextField className="contact__subject mb-4" id="filled-basic" label="Sujet" variant="filled" />
                   <TextField
                      id="filled-multiline-static"
                      className="contact__text"
                      label="Message"
                      multiline
                      rows={9}
                      placeholder="Texte ..."
                      variant="filled"
                    /> 
                </div>
                <div className="contact__footer mt-3">
                    <h1>Digital Howlers</h1>
                    <div className="contact__social d-flex pt-2">
                        <img className="mr-3" src={viber} alt="viber" />
                        <img className="mr-3" src={linkedin} alt="linkedin" />
                        <img className="mr-3" src={wtsp} alt="wtsp" />
                        <img className="mr-3" src={telegram} alt="telegram" />
                        <img className="mr-3" src={fcbk} alt="fcbk" />
                    </div>
                </div>
            </div>
            <img className="howlers" src={howlers} alt="" />
        </div>
    );
};

export default Contact;
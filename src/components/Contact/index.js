import { useRef, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import emailjs from '@emailjs/browser';

/* eslint-disable react/jsx-no-bind */
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import logo from '../../assets/inscriptionok.jpg';

import './style.scss';
//
// package ajouté https://www.emailjs.com/

function Contact() {
  const [success, setSuccess] = useState(false);

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      `${process.env.REACT_APP_YOUR_SERVICE_ID}`,
      `${process.env.REACT_APP_YOUR_TEMPLATE_ID}`,
      form.current,
      `${process.env.REACT_APP_YOUR_PUBLIC_KEY}`,
    )
      .then((result) => {
        setSuccess(true);
        console.log(result.text);
        console.log('message sent');
      }, (error) => {
        console.log(error.text);
      });
  };

  return (
    <div className="Contact">
      { !success && (
      <Form ref={form} onSubmit={sendEmail}>

        <Form.Group
          className="mb-3"
          controlId="exampleForm.ControlInput1"
        >
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="name" name="user_name" />
        </Form.Group>

        <Form.Group
          className="mb-3"
          controlId="exampleForm.ControlInput2"
        >
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="name@example.com" name="user_email" />
        </Form.Group>

        <Form.Group
          className="mb-3"
          controlId="exampleForm.ControlSelect"
        >
          <Form.Label>Thématique</Form.Label>
          <Form.Select aria-label="Exemple par défaut" name="object">
            <option>Choix de la thématique</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </Form.Group>

        <Form.Group
          className="mb-3"
          controlId="exampleForm.ControlTextarea1"
        >
          <Form.Label>Ecris ta remarque ici !</Form.Label>
          <Form.Control as="textarea" rows={5} name="message" />
        </Form.Group>

        <Button className="Contact-button" variant="primary" type="submit" value="Send">
          Envoi
        </Button>
      </Form>
      )}
      { success
        && (
          <div className="Message">
            <img src={logo} className="Message-logo" alt="Logo inscription" />
            <Alert variant="dark">
              <div className="Message-alert">
                <Alert.Heading>Super ! Votre message a bien été envoyée !</Alert.Heading>
              </div>
            </Alert>
          </div>
        )}
    </div>
  );
}

export default Contact;

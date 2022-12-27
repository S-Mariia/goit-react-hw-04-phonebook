import { useState } from 'react';
import PropTypes from 'prop-types';
import { IconContext } from 'react-icons';
import { IoMdPerson } from 'react-icons/io';
import { BsTelephoneFill } from 'react-icons/bs';
import { Form, Label, Input, Button, Wrap } from './ContactForm.styled';

export const ContactForm = ({onSubmit}) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const handleInputChange = (type, value) => {
    switch (type) {
      case "name":
        setName(value);
        break;
      case "number":
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const handleFormSubmit = evt => {
    onSubmit({ evt, name, number });
    setName("");
    setNumber("");
  };

  return (
      <Form onSubmit={handleFormSubmit}>
        <Label>
          <Wrap>
            <IconContext.Provider
              value={{
                size: 20,
              }}
            >
              <IoMdPerson />
            </IconContext.Provider>
            Name
          </Wrap>
          <Input
            onChange={evt => handleInputChange('name', evt.target.value)}
            type="text"
            name="name"
            value={name}
            placeholder="Enter name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </Label>
        <Label>
          <Wrap>
            <IconContext.Provider
              value={{
                size: 20,
              }}
            >
              <BsTelephoneFill />
            </IconContext.Provider>
            Phone
          </Wrap>
          <Input
            onChange={evt => handleInputChange('number', evt.target.value)}
            type="tel"
            name="number"
            value={number}
            placeholder="Enter phone number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </Label>
        <Button type="submit">Add contact</Button>
      </Form>
    );
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

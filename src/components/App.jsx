import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactList } from './ContactList/ContactList';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { MainTitle, Title } from './App.styled';

const LS_KEY = 'contacts';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
      const savedContacts = localStorage.getItem(LS_KEY);
    if (savedContacts !== null) {
      return JSON.parse(savedContacts);
    }
    return [];
  });
  const [filter, setFilter] = useState('');

  const normalizedFilter = filter.toLowerCase();
  const filteredContacts = contacts.filter(({ name }) => {
    return name.toLowerCase().includes(normalizedFilter);
  });

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const handleSubmit = ({ evt, name, number }) => {
    evt.preventDefault();
    const alreadyInList = Boolean(
      contacts.find(contact => contact.name === name)
    );
    if (alreadyInList) {
      alert(`${name} is already in contacts`);
      return;
    }
    setContacts(prevState => [
      ...prevState,
      { id: nanoid(), name, number },
    ]);
  };

  const deleteContact = id => {
    const newList = contacts.filter(contact => contact.id !== id);
    setContacts(newList);
  };

  return (
    <>
      <MainTitle>Phonebook</MainTitle>
      <ContactForm onSubmit={handleSubmit} />

      <Title>Contacts</Title>
      <Filter
        filterValue={filter}
        onChange={evt => setFilter(evt.target.value)}
      />
      <ContactList contacts={filteredContacts} deleteContact={deleteContact} />
    </>
  );
};


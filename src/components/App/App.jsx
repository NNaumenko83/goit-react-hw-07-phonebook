import ContactForm from '../ContactForm';
import ContactList from '../ContactList';
import Filter from '../Filter';
import { ContactsTitle, Container } from './App.styled';
import useInput from '../Hooks/useInput';
import { useSelector } from 'react-redux';
import { getFilterValue } from 'redux/filterSlice';
import { useGetContactsQuery } from 'redux/contactsApi';
import { ThreeDots } from 'react-loader-spinner';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const input = useInput('');
  const filterValue = useSelector(getFilterValue);

  const { data: contacts = [], error, isFetching } = useGetContactsQuery();

  const getVisibleContacts = normalizedFilter => {
    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normalizedFilter)
    );
  };

  const normalizedFilter = filterValue.toLocaleLowerCase();
  const visibleContats = getVisibleContacts(normalizedFilter);

  return (
    <>
      <Container>
        <h1>Phonebook</h1>
        <ContactForm contacts={contacts} />
        <ContactsTitle>Contacts</ContactsTitle>
        <Filter {...input} />
        {isFetching ? (
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#0000ff	"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        ) : (
          <ContactList contacts={visibleContats} />
        )}
        {error && <h3>Something went wrong: {error.data}</h3>}
      </Container>
      <ToastContainer />
    </>
  );
};

export default App;

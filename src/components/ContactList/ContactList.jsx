import ContactItem from 'components/ContactItem';
// import { ContList } from './ContactList.styled';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import List from '@mui/material/List';

const ConttList = styled(List)`
  gap: 10px;
  display: flex;
  flex-direction: column;
`;

const ContactList = ({ contacts }) => {
  return (
    <ConttList>
      {contacts.map(({ id, name, phone }) => {
        return <ContactItem key={id} id={id} name={name} phone={phone} />;
      })}
    </ConttList>
  );
};

ContactList.propTypes = {
  visibleContats: PropTypes.array,
  onDeleteContact: PropTypes.func,
};

export default ContactList;

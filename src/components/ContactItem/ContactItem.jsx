import { ContItem, Button } from './ContactItem.styled';
import PropTypes from 'prop-types';
import { useDeleteContactMutation } from 'redux/contactsApi';
import { Oval } from 'react-loader-spinner';

const ContactItem = ({ name, number, id }) => {
  const [deleteContact, { isLoading, isError }] = useDeleteContactMutation();

  return (
    <ContItem>
      {name}: {number}
      <Button
        type="button"
        onClick={() => deleteContact(id)}
        disabled={isLoading}
      >
        {isLoading && (
          <Oval
            height={15}
            width={15}
            color="rgb(25, 0, 185)"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#4fa94d"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        )}
        Delete
      </Button>
    </ContItem>
  );
};

ContactItem.propTypes = {
  name: PropTypes.string,
  number: PropTypes.string,
  id: PropTypes.string,
};

export default ContactItem;

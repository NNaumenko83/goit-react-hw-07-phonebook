import { Button, Name } from './ContactItem.styled';
import PropTypes from 'prop-types';
import { useDeleteContactMutation } from 'redux/contactsApi';
import { Oval } from 'react-loader-spinner';
import ListItem from '@mui/material/ListItem';
import styled from '@emotion/styled';
import Avatar from '@mui/material/Avatar';
import { toast } from 'react-toastify';

const ContItem = styled(ListItem)`
  gap: 10px;
  font-size: 25px;
`;

function stringToColor(string) {
  let hash = 0;
  let i;
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}

function stringAvatar(name) {
  if (name.split(' ').length > 1)
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}`,
  };
}

const ContactItem = ({ name, phone, id }) => {
  const [deleteContact, { isLoading }] = useDeleteContactMutation();

  const handleButtonClick = async id => {
    await deleteContact(id).unwrap();
    toast.info('Contact deleted', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
  };

  return (
    <ContItem disablePadding>
      <Avatar {...stringAvatar(name)} />
      <Name>{name}:</Name>
      <span>{phone}</span>

      <Button
        type="button"
        onClick={() => handleButtonClick(id)}
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
  phone: PropTypes.string,
  id: PropTypes.string,
};

export default ContactItem;

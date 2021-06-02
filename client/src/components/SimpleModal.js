import React from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Modal from '@material-ui/core/Modal';


const SimpleModal = ({ open, handleClose }) => {
  const [type, setType] = React.useState("signin");
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {type === "signin" ? 
        <SignIn setType={setType} /> :
        <SignUp setType={setType} />
      }
    </Modal>
  );
}

export default SimpleModal

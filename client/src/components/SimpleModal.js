import React from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import AskForm from './AskForm';
import Modal from '@material-ui/core/Modal';


const SimpleModal = ({ open, handleClose, type, setType }) => {

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {
        type === "signin" ? <SignIn setType={setType} /> :
        type === "signup" ? <SignUp setType={setType} /> :
        type === "ask" ? <AskForm handleClose={handleClose} setType={setType} type={type} /> :
        type === "message" ? <AskForm handleClose={handleClose} setType={setType} type={type} /> :
        <AskForm handleClose={handleClose} setType={setType} />
      }
    </Modal>
  );
}

export default SimpleModal

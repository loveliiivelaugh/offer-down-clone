import React from 'react';
import SignIn from './forms/SignIn';
import SignUp from './forms/SignUp';
import AskForm from './forms/AskForm';
import SellingForm from './forms/SellingForm';
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
        type === "sell" ? <SellingForm handleClose={handleClose} setType={setType} type={type} /> :
        <SellingForm handleClose={handleClose} setType={setType} />
      }
    </Modal>
  );
}

export default SimpleModal

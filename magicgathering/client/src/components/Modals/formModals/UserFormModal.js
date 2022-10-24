import React, { useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import AdaptativeModal from "../AdaptativeModal.js";
import Form from "react-bootstrap/Form";
import FormEntry from "./FormEntry.js";

function EditUserModal({ user, handleClose, handleSave, show, requestUser}) {
  const username = useRef(user ? user.userName : null);
  const realName = useRef(user ? user.realName : null);
  const admin = useRef(user ? user.admin : null);

  if (!show) {
    return (
      <AdaptativeModal
        props={(handleClose, handleSave, show)}
      ></AdaptativeModal>
    );
  }

  const modalTitle = "Edit User " + user.userName;
  const footer = true;

  const handleSaveUser = () => {
    handleSave(username.current, realName.current, admin.current);
  };

  const modalProps = {
    modalTitle,
    footer,
    handleClose: handleClose,
    handleSave: handleSaveUser,
    show: show,
  };

  return (
    <AdaptativeModal {...modalProps}>
      <Form noValidate>
        <FormEntry defValue={user.userName} label="Username" refer={username} />
        <FormEntry
          defValue={user.realName}
          label="Real Name"
          refer={realName}
        />
        {requestUser.admin ? (
          <FormEntry defValue={user.admin} label="Admin" refer={admin} />
        ) : (
          <></>
        )}
      </Form>
    </AdaptativeModal>
  );
}

export default EditUserModal;

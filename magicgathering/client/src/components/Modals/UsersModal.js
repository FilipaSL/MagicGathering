import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import AdaptativeModal from "./AdaptativeModal.js";
import InfoDisplay from "../InfoDisplay/InfoDisplay.js";
import Row from "react-bootstrap/Row";

function UserOpsModal({
  userList,
  viewUsersModal,
  handleUserDelete,
  handleUserEdit,
  handleViewUsersModal,
}) {
  if (!viewUsersModal) {
    return (
      <AdaptativeModal
        props={(handleUserDelete, handleUserEdit, viewUsersModal)}
      ></AdaptativeModal>
    );
  }

  const modalTitle = "All Users";
  const footer = false;

  const modalProps = {
    modalTitle,
    footer,
    handleClose: handleViewUsersModal,
    show: viewUsersModal,
  };

  const displayUserProps = {
    handleUserDelete,
    handleViewEditUserModal: handleUserEdit,
  };

  const showUserList = userList.map((user, index) => {
    let userProps = {
      ...displayUserProps,
      user,
      index,
    };
    return <InfoDisplay key={index} {...userProps} />;
  });

  return (
    <AdaptativeModal {...modalProps}>
      {showUserList.length > 0 ? (
        <Row xs={2} md={3} className="justify-content-center">
          {showUserList}
        </Row>
      ) : (
        <p> There are no other</p>
      )}
    </AdaptativeModal>
  );
}

export default UserOpsModal;

import React, { FunctionComponent } from "react";
import {
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter,
  MDBBtn,
} from "mdbreact";
import { InformationModalProps } from "../types";

const InformationModal: FunctionComponent<InformationModalProps> = ({
  open,
  onModalOpen,
  onCancelDelete,
  onConfirmDelete,
}) => {
  return (
    <MDBModal
      isOpen={open}
      toggle={onModalOpen}
      backdrop
      centered
      noClickableBodyWithoutBackdrop
      overflowScroll={false}
      inline={false}
    >
      <MDBModalHeader toggle={onModalOpen}>Confirm Delete</MDBModalHeader>
      <MDBModalBody>Are you sure you want to delete this link?</MDBModalBody>
      <MDBModalFooter>
        <MDBBtn color="blue" onClick={onCancelDelete}>
          No
        </MDBBtn>
        <MDBBtn color="danger" onClick={onConfirmDelete}>
          Yes
        </MDBBtn>
      </MDBModalFooter>
    </MDBModal>
  );
};

export default InformationModal;

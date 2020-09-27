import React, {
  FormEvent,
  useState,
  useEffect,
  useContext,
  SyntheticEvent,
} from "react";
import {
  MDBAlert,
  MDBBox,
  MDBBtn,
  MDBBtnGroup,
  MDBIcon,
  MDBInput,
  MDBInputGroup,
  MDBModal,
  MDBModalHeader,
  MDBModalFooter,
  MDBModalBody,
  MDBPopover,
  MDBPopoverBody,
  MDBPopoverHeader,
  MDBTypography,
  MDBRow,
  MDBCol,
} from "mdbreact";
import CopyToClipboard from "react-copy-to-clipboard";
import { LinkDetails } from "../types";
import { FirebaseContext, firebase, firestore } from "./FirebaseProvider";

// add your information such as linkedin urls and github urls to copy and paste from
const BasicInformation = () => {
  const { user, onLinkSubmission, onLinkUpdate, onLinkDelete } = useContext(
    FirebaseContext
  );
  const [type, setType] = useState<string>("");
  const [url, setURL] = useState<string>("");
  const [links, setLinks] = useState<LinkDetails[]>([]);
  const [activeFieldId, setActiveFieldId] = useState<string>("");

  const [editURLField, setEditURLField] = useState<string>("");
  const [editTypeField, setEditTypeField] = useState<string>("");

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  // intermediate delete field
  const [deleteId, setDeleteId] = useState<string>("");

  const resetEditState = () => {
    setActiveFieldId("");
    setEditURLField("");
    setEditTypeField("");
    setErrorMessage("");
  };

  const resetSubmissionState = () => {
    setType("");
    setURL("");
    setErrorMessage("");
  };

  useEffect(() => {
    if (user) {
      const unsubscribe = firestore
        .collection("users")
        .doc(user.uid)
        .collection("links")
        .onSnapshot((querySnapshot: firebase.firestore.QuerySnapshot) => {
          const data: LinkDetails[] = [];
          querySnapshot.docs.forEach((doc: firebase.firestore.DocumentData) => {
            data.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          setLinks(data);
        });

      return () => unsubscribe();
    }
  }, [user]);

  const handleModalOpen = () => {
    setModalOpen(!modalOpen);
  };

  const handleTypeChange = (event: SyntheticEvent<HTMLSelectElement>) => {
    setType(event.currentTarget.value);
  };

  const handleUrlChange = (event: FormEvent<HTMLInputElement>) => {
    setURL(event.currentTarget.value);
  };

  const handleEditValueChange = (event: FormEvent<HTMLInputElement>) => {
    setEditURLField(event.currentTarget.value);
  };

  const handleEditTypeChange = (event: FormEvent<HTMLSelectElement>) => {
    console.log(event.currentTarget.value);
    setEditTypeField(event.currentTarget.value);
  };

  const handleEditClick = (
    linkId: string,
    linkUrl: string,
    linkType: string
  ) => {
    setActiveFieldId(linkId);

    if (linkUrl) {
      setEditURLField(linkUrl);
    }

    if (linkType) {
      setEditTypeField(linkType);
    }
  };

  const handleEditCancel = () => {
    resetEditState();
  };

  const handleSubmit = async (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      await onLinkSubmission({ type, url });
      resetSubmissionState();
    } catch (err) {
      console.log("Error submitting new link", err);
      // TODO: error message
      setErrorMessage(
        "Error in submitting a new link. Please check your connection and try again."
      );
    }
  };

  const handleSaveLink = async (linkId: string) => {
    const payload: LinkDetails = {
      id: linkId,
      type: editTypeField,
      url: editURLField,
    };

    try {
      await onLinkUpdate(payload);
      resetEditState();
    } catch (err) {
      console.log("Error submitting updating link", err);
      // TODO: error message
      setErrorMessage(
        "Error in updating your link. Please check your connection and try again."
      );
    }
  };

  const handleDeleteLink = (id: string) => {
    setModalOpen(true);
    setDeleteId(id);
  };

  const handleConfirmDelete = async () => {
    await onLinkDelete(deleteId);
    setDeleteId("");
    setModalOpen(false);
  };

  return (
    <MDBBox className="pb-5 border-bottom border-dark">
      <MDBBox className="d-flex flex-row mt-3 justify-content-center align-middle">
        <MDBTypography tag="h2" variant="h2">
          Basic Information
        </MDBTypography>
        <MDBPopover
          placement="right"
          popover
          clickable
          data-toggle="popover-hover"
        >
          <MDBBtn color="primary" size="sm" className="ml-3">
            <MDBIcon icon="question" />
          </MDBBtn>
          <div>
            <MDBPopoverHeader>What is this?</MDBPopoverHeader>
            <MDBPopoverBody>
              Save your frequently used links such as your Github and LinkedIn
              to apply to job applications without have multiple tabs opened.
            </MDBPopoverBody>
          </div>
        </MDBPopover>
      </MDBBox>
      <MDBRow className="my-3">
        <MDBCol md="4" className="px-md-0">
          <select
            className="browser-default custom-select"
            onChange={handleTypeChange}
          >
            <option>Choose Website</option>
            <option value="Github">Github</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="Personal Website">Personal Website</option>
          </select>
        </MDBCol>
        <MDBCol md="4" className="px-md-0">
          <MDBInput
            noTag
            type="text"
            value={url}
            onChange={handleUrlChange}
            hint="URL"
            className=""
          />
        </MDBCol>
        <MDBCol md="4" className="px-md-0">
          <MDBBtn
            color="blue"
            className="m-0 px-2 py-2 w-100"
            onClick={handleSubmit}
          >
            Add
          </MDBBtn>
        </MDBCol>
      </MDBRow>
      {errorMessage !== "" && (
        <MDBAlert
          color="danger"
          className="mt-2"
          dismiss
          onClose={() => {
            setErrorMessage("");
          }}
        >
          {errorMessage}
        </MDBAlert>
      )}
      {links.map((link: LinkDetails) => {
        return (
          <MDBRow key={link.id} className="d-flex flex-row p-0 mt-2">
            <MDBCol
              xl="2"
              className="d-lg-flex flex-lg-column justify-content-lg-center text-left px-md-0"
            >
              {activeFieldId !== link.id ? (
                link.type
              ) : (
                <select
                  className="browser-default custom-select h-100"
                  onChange={handleEditTypeChange}
                  value={activeFieldId !== link.id ? link.type : editTypeField}
                >
                  <option value="Github">Github</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Personal Website">Personal Website</option>
                </select>
              )}
            </MDBCol>
            <MDBCol xl="5" className="px-md-0">
              <MDBInput
                noTag
                type="text"
                className="h-100"
                value={activeFieldId !== link.id ? link.url : editURLField}
                disabled={activeFieldId !== link.id}
                onChange={handleEditValueChange}
              />
            </MDBCol>
            <MDBCol xl="5" className="my-3 my-xl-1 px-0 px-xl-3">
              {activeFieldId === link.id ? (
                <MDBBtnGroup className="w-100">
                  <MDBBtn
                    className="m-0"
                    color="red"
                    onClick={handleEditCancel}
                  >
                    <MDBIcon icon="ban" className="mr-1" />
                    Undo
                  </MDBBtn>
                  <MDBBtn
                    className="m-0"
                    color="blue"
                    onClick={() => {
                      handleSaveLink(link.id);
                    }}
                  >
                    <MDBIcon icon="save" className="mr-1" />
                    Save
                  </MDBBtn>
                </MDBBtnGroup>
              ) : (
                <MDBBtnGroup className="w-100">
                  <MDBBtn
                    rounded
                    color="green"
                    onClick={() => {
                      handleEditClick(link.id, link.url, link.type);
                    }}
                    className="m-0"
                  >
                    <MDBIcon icon="edit" className="mr-1" />
                    Edit
                  </MDBBtn>
                  <CopyToClipboard
                    text={link.url}
                    onCopy={() => {
                      console.log("Copied", link.url);
                    }}
                  >
                    <MDBBtn rounded color="light-blue" className="m-0">
                      <MDBIcon icon="copy" className="mr-1" />
                      Copy
                    </MDBBtn>
                  </CopyToClipboard>
                  <MDBBtn
                    rounded
                    color="red"
                    onClick={() => {
                      handleDeleteLink(link.id);
                    }}
                    className="m-0"
                  >
                    <MDBIcon icon="trash" className="mr-1" />
                    Delete
                  </MDBBtn>
                </MDBBtnGroup>
              )}
            </MDBCol>
          </MDBRow>
        );
      })}
      <MDBModal
        isOpen={modalOpen}
        toggle={handleModalOpen}
        backdrop
        centered
        noClickableBodyWithoutBackdrop
        overflowScroll={false}
        inline={false}
      >
        <MDBModalHeader toggle={handleModalOpen}>Confirm Delete</MDBModalHeader>
        <MDBModalBody>Are you sure you want to delete this link?</MDBModalBody>
        <MDBModalFooter>
          <MDBBtn
            color="blue"
            onClick={() => {
              setModalOpen(false);
              setDeleteId("");
            }}
          >
            No
          </MDBBtn>
          <MDBBtn color="danger" onClick={handleConfirmDelete}>
            Yes
          </MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </MDBBox>
  );
};

export default BasicInformation;

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
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBCol,
} from "mdbreact";
import CopyToClipboard from "react-copy-to-clipboard";
import { FirebaseContext, firebase, firestore } from "../FirebaseProvider";
import InformationHeader from "./InformationHeader";
import InformationForm from "./InformationForm";
import InformationModal from "./InformationModal";
import { LinkDetails } from "../../types";

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

  const handleUpdateLink = async (linkId: string) => {
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

  const handleCancelDelete = () => {
    setModalOpen(false);
    setDeleteId("");
  };

  return (
    <MDBBox className="pb-5 border-bottom border-dark">
      <InformationHeader />
      <InformationForm
        url={url}
        onUrlChange={handleUrlChange}
        onTypeChange={handleTypeChange}
        onSubmit={handleSubmit}
      />
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
      {links.map(({ id, type, url }: LinkDetails) => {
        return (
          <MDBRow key={id} className="d-flex flex-row p-0 mt-2">
            <MDBCol
              lg="2"
              className="d-lg-flex flex-lg-column justify-content-lg-center text-left px-md-0"
            >
              {activeFieldId !== id ? (
                type
              ) : (
                <select
                  className="browser-default custom-select h-100"
                  onChange={handleEditTypeChange}
                  value={activeFieldId !== id ? type : editTypeField}
                >
                  <option value="Github">Github</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Personal Website">Personal Website</option>
                </select>
              )}
            </MDBCol>
            <MDBCol lg="5" className="px-md-0">
              <MDBInput
                noTag
                type="text"
                className="h-100"
                value={activeFieldId !== id ? url : editURLField}
                disabled={activeFieldId !== id}
                onChange={handleEditValueChange}
              />
            </MDBCol>
            <MDBCol lg="5" className="my-3 my-xl-1 px-md-0 px-xl-3">
              {activeFieldId === id ? (
                <div className="d-flex justify-content-around w-100">
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
                      handleUpdateLink(id);
                    }}
                  >
                    <MDBIcon icon="save" className="mr-1" />
                    Save
                  </MDBBtn>
                </div>
              ) : (
                <div className="d-flex justify-content-around w-100">
                  <MDBBtn
                    rounded
                    color="green"
                    onClick={() => {
                      handleEditClick(id, url, type);
                    }}
                    className="m-0"
                  >
                    <MDBIcon icon="edit" className="mr-1" />
                    Edit
                  </MDBBtn>
                  <CopyToClipboard text={url}>
                    <MDBBtn rounded color="light-blue" className="m-0">
                      <MDBIcon icon="copy" className="mr-1" />
                      Copy
                    </MDBBtn>
                  </CopyToClipboard>
                  <MDBBtn
                    rounded
                    color="red"
                    onClick={() => {
                      handleDeleteLink(id);
                    }}
                    className="m-0"
                  >
                    <MDBIcon icon="trash" className="mr-1" />
                    Delete
                  </MDBBtn>
                </div>
              )}
            </MDBCol>
          </MDBRow>
        );
      })}
      <InformationModal
        open={modalOpen}
        onModalOpen={handleModalOpen}
        onCancelDelete={handleCancelDelete}
        onConfirmDelete={handleConfirmDelete}
      />
    </MDBBox>
  );
};

export default BasicInformation;

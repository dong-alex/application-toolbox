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
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBInputGroup,
} from "mdbreact";
import CopyToClipboard from "react-copy-to-clipboard";
import { LinkDetails } from "../types";
import { FirebaseContext, firebase, firestore, auth } from "./FirebaseProvider";

// add your information such as linkedin urls and github urls to copy and paste from
const BasicInformation = () => {
  const { user, onLinkSubmission, onLinkUpdate } = useContext(FirebaseContext);
  const [type, setType] = useState<string>("");
  const [url, setURL] = useState<string>("");
  const [links, setLinks] = useState<LinkDetails[]>([]);
  const [activeFieldId, setActiveFieldId] = useState<string>("");

  const [editURLField, setEditURLField] = useState<string>("");
  const [editTypeField, setEditTypeField] = useState<string>("");

  const [errorMessage, setErrorMessage] = useState<string>("");

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
    console.log("Links change!", links);
  }, [links]);

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

  return (
    <>
      <MDBInputGroup
        id="label-url-submission"
        prepend="Label and URL"
        inputs={
          <div className="d-flex">
            <select
              className="browser-default custom-select w-auto"
              onChange={handleTypeChange}
            >
              <option>Choose your option</option>
              <option value="Github">Github</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Personal Website">Personal Website</option>
            </select>
            <MDBInput
              noTag
              type="text"
              value={url}
              onChange={handleUrlChange}
              hint="Description"
            />
          </div>
        }
        append={
          <MDBBtn
            color="blue"
            className="m-0 px-3 py-2 z-depth-0"
            onClick={handleSubmit}
          >
            Add
          </MDBBtn>
        }
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
      {links.map((link: LinkDetails) => {
        return (
          <MDBBox key={link.id} className="d-flex flex-row p-0 mt-2">
            <MDBInputGroup
              prepend={
                activeFieldId !== link.id ? (
                  link.type
                ) : (
                  <select
                    className="browser-default custom-select h-100"
                    onChange={handleEditTypeChange}
                    value={
                      activeFieldId !== link.id ? link.type : editTypeField
                    }
                  >
                    <option value="Github">Github</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Personal Website">Personal Website</option>
                  </select>
                )
              }
              inputs={
                <MDBInput
                  noTag
                  type="text"
                  className="h-100"
                  value={activeFieldId !== link.id ? link.url : editURLField}
                  disabled={activeFieldId !== link.id}
                  onChange={handleEditValueChange}
                />
              }
              append={
                activeFieldId === link.id ? (
                  <MDBBtnGroup>
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
                  <MDBBtnGroup>
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
                  </MDBBtnGroup>
                )
              }
            />
          </MDBBox>
        );
      })}
    </>
  );
};

export default BasicInformation;

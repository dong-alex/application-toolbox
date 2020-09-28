import React, {
  useState,
  useEffect,
  useContext,
  FunctionComponent,
  FormEvent,
} from "react";
import { MDBBox, MDBBtn, MDBIcon, MDBInput, MDBRow, MDBCol } from "mdbreact";
import DatePicker from "react-datepicker";
import { WorkBase, WorkDetails } from "../../types";
import { FirebaseContext, firestore } from "../FirebaseProvider";
import CopyToClipboard from "react-copy-to-clipboard";
import ExperienceHeader from "./ExperienceHeader";
import AddExperienceSection from "./AddExperienceSection";
import ExperienceModal from "./ExperienceModal";
import "react-datepicker/dist/react-datepicker.css";

const defaultState: WorkDetails = {
  id: "",
  company: "",
  startDate: new Date(),
  endDate: new Date(),
  description: "",
  current: false,
  position: "",
};

const ExperienceSection: FunctionComponent<{}> = () => {
  const { user, onWorkSubmission, onWorkUpdate, onWorkDelete } = useContext(
    FirebaseContext
  );
  const [company, setCompany] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [isCurrent, setIsCurrent] = useState<boolean>(false);
  const [textDescription, setTextDescription] = useState<string>("");
  const [experiences, setExperiences] = useState<WorkDetails[]>([]);
  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const [activeFieldId, setActiveFieldId] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  // intermediate edit fields - to be extracted into a seperate component
  const [editState, setEditState] = useState<WorkDetails>(defaultState);

  // intermediate delete field
  const [deleteId, setDeleteId] = useState<string>("");

  const resetState = () => {
    resetEditState();

    setCompany("");
    setPosition("");
    setIsCurrent(false);
    setTextDescription("");
    setOpenAdd(false);
  };

  const resetEditState = () => {
    setEditState(defaultState);
    setActiveFieldId("");
  };

  useEffect(() => {
    if (user) {
      const unsubscribe = firestore
        .collection("users")
        .doc(user.uid)
        .collection("experiences")
        .onSnapshot((querySnapshot: firebase.firestore.QuerySnapshot) => {
          const data: WorkDetails[] = [];
          querySnapshot.docs.forEach((doc: firebase.firestore.DocumentData) => {
            data.push({
              ...doc.data(),
              id: doc.id,
              startDate: doc.data().startDate.toDate(),
              endDate: doc.data().endDate ? doc.data().endDate.toDate() : null,
            });
          });
          data.sort(function compare(a: WorkDetails, b: WorkDetails) {
            let bEnd = b.endDate || new Date();
            let aEnd = a.endDate || new Date();
            return bEnd.getTime() - aEnd.getTime();
          });
          setExperiences(data);
        });

      return () => unsubscribe();
    }
  }, [user]);

  const handleModalOpen = () => {
    setModalOpen(!modalOpen);
  };

  const handleCompanyChange = (event: FormEvent<HTMLInputElement>) => {
    setCompany(event.currentTarget.value);
  };

  const handlePositionChange = (event: FormEvent<HTMLInputElement>) => {
    setPosition(event.currentTarget.value);
  };

  const handleStartDateChange = (date: Date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: Date) => {
    setEndDate(date);
  };

  const handleCurrentChange = () => {
    setIsCurrent(!isCurrent);
    setEndDate(null);
  };

  const handleDescriptionChange = (event: FormEvent<HTMLTextAreaElement>) => {
    setTextDescription(event.currentTarget.value);
  };

  const handleEditClick = (details: WorkDetails) => {
    const { id } = details;
    setActiveFieldId(id);
    setEditState(details);
  };

  const handleDeleteExperience = (id: string) => {
    setModalOpen(true);
    setDeleteId(id);
  };

  const handleEditChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (event.currentTarget.name === "current") {
      setEditState({
        ...editState,
        current: !editState.current,
      });
    } else {
      setEditState({
        ...editState,
        [event.currentTarget.name]: event.currentTarget.value,
      });
    }
  };

  const handleSubmitClick = async (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const payload: WorkBase = {
      company,
      position,
      startDate,
      endDate,
      current: isCurrent,
      description: textDescription,
    };

    await onWorkSubmission(payload);

    resetState();
  };

  const handleSaveChanges = async (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await onWorkUpdate(editState);
    resetEditState();
  };

  const handleConfirmDelete = async () => {
    await onWorkDelete(deleteId);
    setDeleteId("");
    setModalOpen(false);
  };

  const handleOpenAddExperience = () => {
    setOpenAdd(!openAdd);
  };

  const handleCancelDelete = () => {
    setModalOpen(false);
    setDeleteId("");
  };

  return (
    <MDBBox className="d-flex flex-column">
      <ExperienceHeader />
      <AddExperienceSection
        open={openAdd}
        company={company}
        position={position}
        isCurrent={isCurrent}
        startDate={startDate}
        endDate={endDate}
        textDescription={textDescription}
        onOpenAddExperience={handleOpenAddExperience}
        onCompanyChange={handleCompanyChange}
        onPositionChange={handlePositionChange}
        onCurrentChange={handleCurrentChange}
        onStartDateChange={handleStartDateChange}
        onEndDateChange={handleEndDateChange}
        onDescriptionChange={handleDescriptionChange}
        onSubmitClick={handleSubmitClick}
      />
      {experiences.map(
        ({
          id,
          company,
          description,
          startDate,
          endDate,
          current,
          position,
        }: WorkDetails) => {
          return (
            <MDBBox key={id} className="d-flex flex-column mt-2 mb-5">
              <MDBRow className="my-2">
                <MDBCol lg="8" className="px-1">
                  <MDBInput
                    noTag
                    type="text"
                    name="company"
                    className="h-auto"
                    value={activeFieldId !== id ? company : editState.company}
                    disabled={activeFieldId !== id}
                    onChange={handleEditChange}
                  />
                </MDBCol>
                <MDBCol lg="4" className="px-1">
                  {activeFieldId === id ? (
                    <div className="d-flex justify-content-around w-100">
                      <MDBBtn
                        className="m-0"
                        color="red"
                        onClick={resetEditState}
                      >
                        <MDBIcon icon="ban" className="mr-1" />
                        Undo
                      </MDBBtn>
                      <MDBBtn
                        className="m-0"
                        color="blue"
                        onClick={handleSaveChanges}
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
                          handleEditClick({
                            id,
                            company,
                            description,
                            position,
                            startDate,
                            endDate,
                            current,
                          });
                        }}
                        className="m-0"
                      >
                        <MDBIcon icon="edit" className="mr-1" />
                        Edit
                      </MDBBtn>
                      <MDBBtn
                        rounded
                        color="red"
                        className="m-0"
                        onClick={() => {
                          handleDeleteExperience(id);
                        }}
                      >
                        <MDBIcon icon="trash" className="mr-1" />
                        Delete
                      </MDBBtn>
                    </div>
                  )}
                </MDBCol>
              </MDBRow>
              <MDBRow className="my-3 d-flex align-middle">
                <MDBCol>
                  <div className="mr-3">
                    <label className="mr-3">Start Date:</label>
                    <DatePicker
                      showYearDropdown
                      dateFormat="MM/dd/yyyy"
                      maxDate={
                        activeFieldId !== id ? endDate : editState.endDate
                      }
                      selected={
                        activeFieldId !== id ? startDate : editState.startDate
                      }
                      onChange={(date) => {
                        let newDate = date as Date;
                        setEditState({ ...editState, startDate: newDate });
                      }}
                      disabled={activeFieldId !== id}
                    />
                  </div>
                </MDBCol>
                <MDBCol>
                  <div>
                    <label className="mr-3">End Date:</label>
                    <DatePicker
                      showYearDropdown
                      dateFormat="MM/dd/yyyy"
                      minDate={
                        activeFieldId !== id ? startDate : editState.startDate
                      }
                      selected={
                        activeFieldId !== id ? endDate : editState.endDate
                      }
                      onChange={(date) => {
                        let newDate = date as Date;
                        setEditState({ ...editState, endDate: newDate });
                      }}
                      disabled={
                        activeFieldId !== id || (editState && editState.current)
                      }
                    />
                  </div>
                </MDBCol>
              </MDBRow>
              <MDBInput
                noTag
                type="text"
                name="position"
                hint="Position"
                className="h-auto"
                value={activeFieldId !== id ? position : editState.position}
                disabled={activeFieldId !== id}
                onChange={handleEditChange}
              />
              <MDBBox className="align-middle mt-3">
                <label className="mr-3">Current?</label>
                <input
                  type="checkbox"
                  name="current"
                  checked={activeFieldId !== id ? isCurrent : editState.current}
                  disabled={activeFieldId !== id}
                  onChange={handleEditChange}
                />
              </MDBBox>
              {activeFieldId !== id ? (
                <span>Description: Read Only</span>
              ) : (
                <span>Description: Edit Mode</span>
              )}
              <textarea
                rows={7}
                className="mb-3"
                name="description"
                value={
                  activeFieldId !== id ? description : editState.description
                }
                onChange={handleEditChange}
                readOnly={activeFieldId !== id}
              />
              {activeFieldId !== id && (
                <CopyToClipboard
                  text={description}
                  onCopy={() => {
                    console.log("Copied", description);
                  }}
                >
                  <MDBBtn rounded color="light-blue" className="m-0">
                    <MDBIcon icon="copy" className="mr-1" />
                    Copy Description
                  </MDBBtn>
                </CopyToClipboard>
              )}
            </MDBBox>
          );
        }
      )}
      <ExperienceModal
        open={modalOpen}
        onModalOpen={handleModalOpen}
        onCancelDelete={handleCancelDelete}
        onConfirmDelete={handleConfirmDelete}
      />
    </MDBBox>
  );
};

export default ExperienceSection;

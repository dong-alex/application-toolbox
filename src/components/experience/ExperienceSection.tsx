import React, {
  useState,
  useEffect,
  useContext,
  FunctionComponent,
} from "react";
import { MDBBox } from "mdbreact";
import { WorkDetails, ExperienceFormValues } from "../../types";
import { FirebaseContext, firestore } from "../FirebaseProvider";
import ExperienceHeader from "./ExperienceHeader";
import AddExperienceSection from "./AddExperienceSection";
import ExperienceModal from "./ExperienceModal";
import ExperienceItem from "./ExperienceItem";
import "react-datepicker/dist/react-datepicker.css";

const ExperienceSection: FunctionComponent<{}> = () => {
  const { user, onWorkSubmission, onWorkUpdate, onWorkDelete } = useContext(
    FirebaseContext
  );
  const initialValues: ExperienceFormValues = {
    company: "",
    position: "",
    startDate: new Date(),
    endDate: new Date(),
    current: false,
    description: "",
  };

  const [experiences, setExperiences] = useState<WorkDetails[]>([]);
  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const [activeFieldId, setActiveFieldId] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  // intermediate delete field
  const [deleteId, setDeleteId] = useState<string>("");

  const handleCloseEdit = () => {
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

  const handleEditClick = (id: string) => {
    setActiveFieldId(id);
  };

  const handleDeleteExperience = (id: string) => {
    setModalOpen(true);
    setDeleteId(id);
  };

  const handleSubmitClick = async (values: ExperienceFormValues) => {
    await onWorkSubmission(values);
  };

  const handleSaveChanges = async (values: WorkDetails) => {
    await onWorkUpdate(values);
    setActiveFieldId("");
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
        initialValues={initialValues}
        onOpenAddExperience={handleOpenAddExperience}
        onSubmitClick={handleSubmitClick}
      />
      {experiences.map((details: WorkDetails) => (
        <ExperienceItem
          details={details}
          activeField={details.id === activeFieldId}
          onEditClose={handleCloseEdit}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteExperience}
          onSaveChanges={handleSaveChanges}
        />
      ))}
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

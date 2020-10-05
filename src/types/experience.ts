import { WorkDetails } from "./information";

export type AddExperienceProps = {
  open: boolean;
  initialValues: ExperienceFormValues;
  onOpenAddExperience: () => void;
  onSubmitClick: (values: ExperienceFormValues) => Promise<void>;
};

export type ExperienceModalProps = {
  open: boolean;
  onModalOpen: () => void;
  onCancelDelete: () => void;
  onConfirmDelete: () => Promise<void>;
};

export interface ExperienceFormValues {
  company: string;
  position: string;
  startDate: Date;
  endDate: Date;
  current: boolean;
  description: string;
}

export type ExperienceItemProps = {
  details: WorkDetails;
  activeField: boolean;
  onEditClose: () => void;
  onEditClick: (id: string) => void;
  onDeleteClick: (id: string) => void;
  onSaveChanges: (values: WorkDetails) => void;
};

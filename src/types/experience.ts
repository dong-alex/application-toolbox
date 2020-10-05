import { FormEvent } from "react";

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

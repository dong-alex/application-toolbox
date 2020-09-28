import { FormEvent } from "react";

export type AddExperienceProps = {
  open: boolean;
  company: string;
  position: string;
  isCurrent: boolean;
  startDate: Date;
  endDate: Date | null;
  textDescription: string;
  onOpenAddExperience: () => void;
  onCompanyChange: (event: FormEvent<HTMLInputElement>) => void;
  onPositionChange: (event: FormEvent<HTMLInputElement>) => void;
  onCurrentChange: () => void;
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: Date) => void;
  onDescriptionChange: (event: FormEvent<HTMLTextAreaElement>) => void;
  onSubmitClick: (event: FormEvent<HTMLButtonElement>) => Promise<void>;
};

export type ExperienceModalProps = {
  open: boolean;
  onModalOpen: () => void;
  onCancelDelete: () => void;
  onConfirmDelete: () => Promise<void>;
};

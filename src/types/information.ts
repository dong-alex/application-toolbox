import { FormEvent, SyntheticEvent } from "react";

// ids are optional until it is registerd into firebase
export interface LinkDetails extends LinkBase {
  id: string;
}

export interface WorkDetails extends WorkBase {
  id: string;
}

export interface LinkBase {
  type: string;
  url: string;
}

export interface WorkBase {
  company: string;
  position: string;
  description: string;
  startDate: Date;
  endDate: Date | null; // if current - then endDate = null
  current: boolean;
}

export type InformationFormProps = {
  url: string;
  onTypeChange: (event: SyntheticEvent<HTMLSelectElement>) => void;
  onUrlChange: (event: FormEvent<HTMLInputElement>) => void;
  onSubmit: (event: FormEvent<HTMLButtonElement>) => Promise<void>;
};

export type InformationModalProps = {
  open: boolean;
  onModalOpen: () => void;
  onCancelDelete: () => void;
  onConfirmDelete: () => Promise<void>;
};

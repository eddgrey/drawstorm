import { create } from "zustand";

const defaultValues = { title: "" };

interface CreateTeamModal {
  isOpen: boolean;
  initialValues: typeof defaultValues;
  onOpen: () => void;
  onClose: () => void;
}

export const useCreateTeamModal = create<CreateTeamModal>((set) => ({
  isOpen: false,
  onOpen: () =>
    set({
      isOpen: true,
      initialValues: { title: "" },
    }),
  onClose: () =>
    set({
      isOpen: false,
      initialValues: { title: "" },
    }),
  initialValues: defaultValues,
}));

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Repository } from '../types/Repository';

interface ModalState {
  isOpen: boolean;
  repository: Repository | null;
}

const initialState: ModalState = {
  isOpen: false,
  repository: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<Repository>) => {
      state.isOpen = true;
      state.repository = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.repository = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;

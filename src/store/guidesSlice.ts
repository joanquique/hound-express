import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Guide } from '../types/Guide';

interface GuidesState {
  guias: Guide[];
  historial: Guide | null;
}

const initialState: GuidesState = {
  guias: [],
  historial: null,
};

const guidesSlice = createSlice({
  name: 'guides',
  initialState,
  reducers: {
    addGuide(state, action: PayloadAction<Guide>) {
      state.guias.push(action.payload);
    },
    updateGuideStatus(state, action: PayloadAction<{ id: string; status: Guide['estado'] }>) {
      const guide = state.guias.find(g => g.id === action.payload.id);
      if (guide) guide.estado = action.payload.status;
    },
    setHistorial(state, action: PayloadAction<Guide | null>) {
      state.historial = action.payload;
    },
  },
});

export const { addGuide, updateGuideStatus, setHistorial } = guidesSlice.actions;

export default guidesSlice.reducer;

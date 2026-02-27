import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Guide } from "../types/Guide";
import type { ApiGuide } from "../types/ApiGuide";
import { GuidesAPI } from "../api/guides.ts";
import { apiToUiGuide } from "../mappers/guides";

export interface GuidesState {
  guias: Guide[];
  historial: Guide | null;
  loading: boolean;
  error: string | null;
}

const initialState: GuidesState = {
  guias: [],
  historial: null,
  loading: false,
  error: null,
};

export const fetchGuides = createAsyncThunk<Guide[]>(
  "guides/fetchGuides",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await GuidesAPI.list();
      const list = (data as ApiGuide[]).map(apiToUiGuide);
      return list;
    } catch {
      return rejectWithValue("No se pudieron cargar las guías.");
    }
  }
);

export const createGuide = createAsyncThunk<
  Guide,
  { trackingNumber: string; origin: string; destination: string; currentStatus: string }
>(
  "guides/createGuide",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await GuidesAPI.create(payload);
      return apiToUiGuide(data as ApiGuide);
    } catch {
      return rejectWithValue("No se pudo registrar la guía (¿duplicada o datos inválidos?).");
    }
  }
);

export const updateGuideStatus = createAsyncThunk<
  Guide,
  { id: string; currentStatus: string }
>(
  "guides/updateGuideStatus",
  async ({ id, currentStatus }, { rejectWithValue }) => {
    try {
      const { data } = await GuidesAPI.update(Number(id), { currentStatus });
      return apiToUiGuide(data as ApiGuide);
    } catch {
      return rejectWithValue("No se pudo actualizar el estado.");
    }
  }
);

const guidesSlice = createSlice({
  name: "guides",
  initialState,
  reducers: {
    setHistorial(state, action: PayloadAction<Guide | null>) {
      state.historial = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchGuides.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGuides.fulfilled, (state, action) => {
        state.loading = false;
        state.guias = action.payload;
      })
      .addCase(fetchGuides.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Error cargando guías.";
      })

      // create
      .addCase(createGuide.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createGuide.fulfilled, (state, action) => {
        state.loading = false;
        state.guias.unshift(action.payload);
      })
      .addCase(createGuide.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Error registrando guía.";
      })

      // update
      .addCase(updateGuideStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateGuideStatus.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.guias.findIndex((g) => g.id === action.payload.id);
        if (idx !== -1) state.guias[idx] = action.payload;
      })
      .addCase(updateGuideStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Error actualizando guía.";
      });
  },
});

export const { setHistorial, clearError } = guidesSlice.actions;
export default guidesSlice.reducer;
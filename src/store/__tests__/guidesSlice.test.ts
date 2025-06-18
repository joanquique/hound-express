import type { GuidesState } from '../guidesSlice';
import guidesReducer, {
  addGuide,
  updateGuideStatus,
} from '../guidesSlice';
import type { Guide } from '../../types/Guide';

describe('guidesSlice', () => {
  const initialState: GuidesState = {
    guias: [],
    historial: null,
  };

  test('agrega una nueva guía', () => {
    const nuevaGuia: Guide = {
      id: '1',
      origen: 'CDMX',
      destino: 'Puebla',
      destinatario: 'Luis',
      fecha: '2025-07-01',
      estado: 'Pendiente',
      ultimaActualizacion: new Date().toISOString(),
    };

    const result = guidesReducer(initialState, addGuide(nuevaGuia));
    expect(result.guias.length).toBe(1);
    expect(result.guias[0]).toEqual(nuevaGuia);
  });

  test('actualiza el estado de una guía existente', () => {
    const initial: GuidesState = {
      guias: [
        {
          id: '1',
          origen: 'CDMX',
          destino: 'Puebla',
          destinatario: 'Luis',
          fecha: '2025-07-01',
          estado: 'Pendiente',
          ultimaActualizacion: '2025-07-01T10:00:00Z',
        },
      ],
      historial: null,
    };

    const result = guidesReducer(
      initial,
      updateGuideStatus({ id: '1', status: 'En tránsito' })
    );

    expect(result.guias[0].estado).toBe('En tránsito');
  });
});

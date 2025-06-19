import { render, screen, fireEvent } from '@testing-library/react';
import RegistroForm from '../RegistroForm';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

describe('RegistroForm', () => {
  test('agrega una guía correctamente', () => {
    render(
      <Provider store={store}>
        <RegistroForm />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText('Origen'), {
      target: { value: 'CDMX' },
    });

    fireEvent.change(screen.getByPlaceholderText('Destino'), {
      target: { value: 'Guadalajara' },
    });

    fireEvent.change(screen.getByPlaceholderText('Destinatario'), {
      target: { value: 'Juan Pérez' },
    });

    fireEvent.change(screen.getByLabelText(/fecha/i), {
      target: { value: '2025-06-30' },
    });

    fireEvent.click(screen.getByRole('button', { name: /registrar guía/i }));

    const origenInput = screen.getByPlaceholderText('Origen') as HTMLInputElement;
    expect(origenInput.value).toBe('');
  });
});

import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../Componentes/navBarDoctor';
import Footer from '../../Componentes/footer';
import '../../Componentes/inicio.css';

function SeleccionarAreaMedica() {
  const navigate = useNavigate();

  const especialidades = [
    'Medicina General',
    'Pediatría',
    'Cardiología',
    'Dermatología',
    'Ginecología',
    'Oftalmología',
    'Otorrinolaringología',
    'Neurología',
    'Endocrinología',
    'Psiquiatría',
    'Urología',
    'Traumatología',
    'Odontología'
  ];

  const manejarSeleccion = (especialidad) => {
    // Redirigir a la página de horarios disponibles
    navigate('/horariosDoctor', { state: { especialidad } });
  };

  return (
    <div>
      <NavBar />
      <div className='container' style={{ padding: '20px', maxWidth: '600px', marginTop: '40px' }}>
        <h1 style={{ color: '#333', marginBottom: '20px' }}>Seleccione el Área Médica</h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
          {especialidades.map((especialidad, index) => (
            <button
              key={index}
              onClick={() => manejarSeleccion(especialidad)}
              style={{
                padding: '10px 20px',
                fontSize: '14px',
                borderRadius: '5px',
                border: 'none',
                backgroundColor: '#007bff',
                color: '#fff',
                cursor: 'pointer',
                transition: 'background-color 0.3s, transform 0.2s',
                marginBottom: '10px'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
              onMouseDown={(e) => e.target.style.transform = 'scale(0.95)'}
              onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
            >
              {especialidad}
            </button>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SeleccionarAreaMedica;

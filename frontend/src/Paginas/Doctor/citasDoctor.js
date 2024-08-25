
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../Componentes/inicio.css'; 
import NavBar from '../../Componentes/navBarDoctor';
import Footer from '../../Componentes/footer';

function CitasDoctor() {
  const [citas, setCitas] = useState([]);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  // Obtener el ID del doctor desde localStorage
  const doctorId = localStorage.getItem('usuarioId');

  useEffect(() => {
    if (!doctorId) {
      setError('No se pudo obtener el ID del doctor.');
      return;
    }

    const fetchCitas = async () => {
      try {
        // Obtener citas asignadas al doctor
        const response = await axios.get(`http://localhost:3001/CitasAgendadas?DoctorId=${doctorId}`);
        setCitas(response.data);
      } catch (error) {
        console.error("Error al cargar las citas:", error);
        setError('Error al cargar las citas.');
      }
    };

    fetchCitas();
  }, [doctorId]);

  const handleMarkAsAttended = async (id) => {
    try {
        // Obtener la cita actual para evitar sobrescribir otros campos
        const citaExistente = citas.find(cita => cita.id === id);

        if (!citaExistente) {
            setError('No se pudo encontrar la cita para actualizar.');
            return;
        }

        // Actualizar solo el estado de la cita a "Asistida"
        await axios.put(`http://localhost:3001/CitasAgendadas/${id}`, {
            ...citaExistente,
            Estado: 'Asistida'
        });

        // Actualizar el estado de citas en el frontend
        setCitas(citas.map(cita =>
            cita.id === id ? { ...cita, Estado: 'Asistida' } : cita
        ));

        setMessage('Cita marcada como asistida.');
    } catch (error) {
        setError('Error al marcar la cita como asistida.');
        console.error('Error al marcar la cita como asistida:', error);
    }
};


  if (error) {
    return <div className='error'>{error}</div>;
  }

  return (
    <div>
      <NavBar />
      <div className='container' style={{ padding: '20px' }}>
        <h1>Citas Asignadas</h1>

        {message && <p className='message'>{message}</p>}

        <ul style={{ padding: '0' }}>
          {citas.map((cita) => (
            <li 
              key={cita.id} 
              style={{ 
                listStyle: 'none', 
                padding: '15px', 
                marginBottom: '10px', 
                border: '1px solid #00bcd4', 
                borderRadius: '8px', 
                backgroundColor: '#f5f5f5',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center'
              }}
            >
              <div>
                <strong>{cita.Fecha} - {cita.Hora}</strong>: {cita.Consultorio}
                <p><strong>Paciente:</strong> {cita.PacienteNombre}</p>
                <p><strong>Especialidad:</strong> {cita.Especialidad}</p>
                <p><strong>Estado:</strong> {cita.Estado}</p>
              </div>
              {cita.Estado === 'Asignada' && (
                <button 
                  style={{ 
                    padding: '10px 15px', 
                    backgroundColor: '#4caf50', 
                    color: '#fff', 
                    border: 'none', 
                    borderRadius: '5px', 
                    cursor: 'pointer' 
                  }}
                  onClick={() => handleMarkAsAttended(cita.id)}
                >
                Marcar como Asistida
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
}

export default CitasDoctor;

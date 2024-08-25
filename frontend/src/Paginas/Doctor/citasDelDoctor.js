import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../../Componentes/navBarDoctor';
import Footer from '../../Componentes/footer';

function CitasDelDoctor() {
  const [citas, setCitas] = useState([]);
  const [filteredCitas, setFilteredCitas] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    doctor: '',
    especialidad: '',
    estado: '',
    fecha: ''
  });
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const [doctores, setDoctores] = useState([]);

  // Obtener el ID del paciente desde localStorage
  const pacienteId = localStorage.getItem('usuarioId');

  useEffect(() => {
    if (!pacienteId) {
      setError('No se pudo obtener el ID del paciente.');
      return;
    }

    const fetchData = async () => {
      try {
        // Obtener citas del paciente
        const citasResponse = await axios.get('http://localhost:3001/CitasAgendadas');
        const citasPaciente = citasResponse.data.filter(cita => cita.PacienteId === pacienteId); // Filtrar por PacienteId
        const citasOrdenadas = citasPaciente.sort((a, b) => new Date(b.Fecha) - new Date(a.Fecha));
        setCitas(citasOrdenadas);
        
        // Obtener lista de doctores
        const doctoresResponse = await axios.get('http://localhost:3001/Usuarios');
        const doctoresFiltrados = doctoresResponse.data.filter(doc => doc.Rol === 'Doctor');
        setDoctores(doctoresFiltrados);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };

    fetchData();
  }, [pacienteId]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterOptions(prevOptions => ({
      ...prevOptions,
      [name]: value,
    }));
  };

  const applyFilters = () => {
    const filtered = citas.filter(cita => {
      return (
        (filterOptions.doctor ? getDoctorNameById(cita.DoctorId).toLowerCase().includes(filterOptions.doctor.toLowerCase()) : true) &&
        (filterOptions.especialidad ? cita.Especialidad.toLowerCase() === filterOptions.especialidad.toLowerCase() : true) &&
        (filterOptions.fecha ? new Date(cita.Fecha).toDateString() === new Date(filterOptions.fecha).toDateString() : true) &&
        (filterOptions.estado ? cita.Estado.toLowerCase() === filterOptions.estado.toLowerCase() : true)
      );
    });
    setFilteredCitas(filtered);
  };

  const handleCancelAppointment = async (id) => {
    try {
      // Actualizar el estado de la cita a "Cancelada"
      await axios.patch(`http://localhost:3001/CitasAgendadas/${id}`, {
        Estado: 'Cancelada'
      });
      // Aplicar multa al paciente
      await axios.post('http://localhost:3001/Multas', {
        PacienteId: pacienteId,
        Monto: 10000, 
        Motivo: 'Cancelación de cita',
        Fecha: new Date().toISOString().split('T')[0] 
      });

      // Actualizar el estado de citas
      const nuevasCitas = citas.map(cita => 
        cita.id === id ? { ...cita, Estado: 'Cancelada' } : cita
      );
      setCitas(nuevasCitas);
      setFilteredCitas(nuevasCitas.filter(cita => cita.id !== id));

      setMessage('Cita cancelada con éxito y multa aplicada.');
    } catch (error) {
      setError('Error al cancelar la cita.');
      console.error('Error al cancelar la cita:', error);
    }
  };

  const getDoctorNameById = (id) => {
    const doctor = doctores.find(doc => doc.id === id);
    return doctor ? `Dr. ${doctor.Nombre}` : 'Desconocido';
  };

  const resetFilters = () => {
    setFilterOptions({
      doctor: '',
      especialidad: '',
      estado: '',
      fecha: ''
    });
    setFilteredCitas(citas);
  };

  if (error) {
    return <div style={styles.error}>{error}</div>;
  }

  return (
    <div>
      <NavBar />
      <div style={styles.container}>
      
      <div style={styles.consultarCitas}>
        <h1 style={styles.heading}>Mis Citas</h1>

        <div style={styles.filtros}>
          <label style={styles.label}>
            Doctor: 
            <input 
              type='text' 
              name='doctor'
              value={filterOptions.doctor}
              onChange={handleFilterChange}
              placeholder='Nombre del Doctor'
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            Especialidad:
            <input 
              type='text' 
              name='especialidad'
              value={filterOptions.especialidad}
              onChange={handleFilterChange}
              placeholder='Especialidad'
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            Fecha:
            <input 
              type='date' 
              name='fecha'
              value={filterOptions.fecha}
              onChange={handleFilterChange}
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            Estado:
            <select 
              name='estado'
              value={filterOptions.estado}
              onChange={handleFilterChange}
              style={styles.input}
            >
              <option value=''>--Selecciona Estado--</option>
              <option value='Asignada'>Asignada</option>
              <option value='Cancelada'>Cancelada</option>
              <option value='Asistida'>Asistida</option>
            </select>
          </label>
          <div style={styles.filtersButtons}>
            <button 
              onClick={applyFilters} 
              style={styles.btnPrimary}
            >
              Aplicar Filtros
            </button>
            <button 
              onClick={resetFilters} 
              style={styles.btnSecondary}
            >
              Resetear Filtros
            </button>
          </div>
        </div>

        {message && <p style={styles.message}>{message}</p>}

        <ul style={styles.citasList}>
          {(filterOptions.doctor || filterOptions.especialidad || filterOptions.estado || filterOptions.fecha ? filteredCitas : citas)
            .map((cita) => (
              <li 
                key={cita.id} 
                style={styles.citaItem}
              >
                <div>
                  <strong>{cita.Fecha} - {cita.Hora}</strong>: {cita.Consultorio}
                  <p><strong>Doctor:</strong> {getDoctorNameById(cita.DoctorId)}</p>
                  <p><strong>Especialidad:</strong> {cita.Especialidad}</p>
                  <p><strong>Estado:</strong> {cita.Estado}</p>
                </div>
                {cita.Estado === 'Asignada' && (
                  <button 
                    style={styles.btnDanger}
                    onClick={() => handleCancelAppointment(cita.id)}
                  >
                    Cancelar
                  </button>
                )}
              </li>
            ))
          }
        </ul>
      </div>
      </div>
      <Footer />
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    backgroundColor: '#f4f4f4',
  },
  consultarCitas: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
  },
  heading: {
    textAlign: 'center',
    color: '#00bcd4',
  },
  filtros: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginBottom: '20px',
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    width: '200px',
    fontSize: '16px',
  },
  input: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
  },
  filtersButtons: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
  },
  btnPrimary: {
    padding: '10px 15px',
    backgroundColor: '#00bcd4',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  btnSecondary: {
    padding: '10px 15px',
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  btnDanger: {
    padding: '10px 15px',
    backgroundColor: '#ff5722',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  citasList: {
    listStyle: 'none',
    padding: '0',
  },
  citaItem: {
    padding: '15px',
    marginBottom: '10px',
    border: '1px solid #00bcd4',
    borderRadius: '8px',
    backgroundColor: '#f5f5f5',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  message: {
    color: '#4caf50',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  error: {
    color: '#f44336',
    fontWeight: 'bold',
    textAlign: 'center',
  },
}

export default CitasDelDoctor;

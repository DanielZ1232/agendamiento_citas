import React, { useState } from 'react';
import axios from 'axios';
import './consultaCita.css'; 
import NavBar from '../../Componentes/navBarAsesor';
import Footer from '../../Componentes/footer';

function ConsultarCitas() {
  const [correo, setCorreo] = useState('');
  const [citas, setCitas] = useState([]);
  const [error, setError] = useState('');
  const [estadoFiltro, setEstadoFiltro] = useState('');
  const [areaMedicaFiltro, setAreaMedicaFiltro] = useState('');

  const buscarCitas = async () => {
    try {
      // Llamada a la API para obtener todos los usuarios
      const { data: usuarios } = await axios.get('http://localhost:3001/Usuarios/');
      // Encontrar el usuario por correo
      const usuario = usuarios.find(user => user.Correo === correo);

      if (!usuario) {
        setError('No se encontró el paciente con ese correo.');
        setCitas([]);
        return;
      }

      // Llamada a la API para obtener las citas del paciente
      const { data: citasPaciente } = await axios.get(`http://localhost:3001/CitasAgendadas?idPaciente=${usuario.PacienteId}`);
      
      // Filtrar citas por estado y área médica
      let citasFiltradas = citasPaciente;

      if (estadoFiltro) {
        citasFiltradas = citasFiltradas.filter(cita => cita.Estado === estadoFiltro);
      }

      if (areaMedicaFiltro) {
        citasFiltradas = citasFiltradas.filter(cita => cita.AreaMedica === areaMedicaFiltro);
      }

      setCitas(citasFiltradas);
      setError('');
    } catch (err) {
      setError('Ocurrió un error al buscar las citas.');
      console.error(err);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="consultar-citas">
        <h2>Consultar Citas del Paciente</h2>
        <input
          type="email"
          placeholder="Ingrese el correo del paciente"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
        <button onClick={buscarCitas}>Buscar</button>

        <div className="filtros">
          <select
            value={estadoFiltro}
            onChange={(e) => setEstadoFiltro(e.target.value)}
          >
            <option value="">Filtrar por Estado</option>
            <option value="Asignada">Asignada</option>
            <option value="Cancelada">Cancelada</option>
            <option value="Asistida">Asistida</option>
            {/* Agregar otros estados si es necesario */}
          </select>

          <select
            value={areaMedicaFiltro}
            onChange={(e) => setAreaMedicaFiltro(e.target.value)}
          >
            <option value="">Filtrar por Área Médica</option>
            <option value="Medicina General">Medicina General</option>
            <option value="Pediatría">Pediatría</option>
            <option value="Cardiología">Cardiología</option>
            <option value="Dermatología">Dermatología</option>
            <option value="Ginecología">Ginecología</option>
            <option value="Oftalmología">Oftalmología</option>
            <option value="Otorrinolaringología">Otorrinolaringología</option>
            <option value="Neurología">Neurología</option>
            <option value="Endocrinología">Endocrinología</option>
            <option value="Psiquiatría">Psiquiatría</option>
            <option value="Urología">Urología</option>
            <option value="Traumatología">Traumatología</option>
            <option value="Odontología">Odontología</option>
            {/* Agregar otras áreas médicas si es necesario */}
          </select>
        </div>

        {error && <p className="error">{error}</p>}
        <ul>
          {citas.map((cita, index) => (
            <li key={index} className='li'>
              <p><strong>Fecha:</strong> {cita.Fecha}</p>
              <p><strong>Hora:</strong> {cita.Hora}</p>
              <p><strong>Doctor:</strong> {cita.DoctorNombre}</p>
              <p><strong>Consultorio:</strong> {cita.Consultorio}</p>
              <p><strong>Estado:</strong> {cita.Estado}</p>
              <p><strong>Área Médica:</strong> {cita.Especialidad}</p>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
}

export default ConsultarCitas;

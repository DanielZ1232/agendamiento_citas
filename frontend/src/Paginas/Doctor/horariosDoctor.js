import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../../Componentes/navBarAsesor';
import Footer from '../../Componentes/footer';
import emailjs from 'emailjs-com'; // Importa emailjs
import './horarios.css';

function Horarios() {
  const location = useLocation();
  const { especialidad } = location.state || {};
  const [doctores, setDoctores] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [appointmentMessage, setAppointmentMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!especialidad) return;

    const fetchData = async () => {
      try {
        const respuesta = await axios.get('http://localhost:3001/Usuarios/');
        const usuarios = respuesta.data;

        // Filtrar doctores según la especialidad seleccionada
        const doctoresFiltrados = usuarios.filter(doc =>
          doc.Rol === 'Doctor' && doc.Especialidad === especialidad
        );

        setDoctores(doctoresFiltrados);
      } catch (error) {
        setError('Error al obtener datos de los doctores.');
        console.error('Error al obtener datos de los doctores:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [especialidad]);

  const handleDoctorChange = (event) => {
    setSelectedDoctor(event.target.value);
    setSelectedDate('');
    setSelectedTime('');
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    setSelectedTime('');
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleScheduleAppointment = async (doctor, date, time) => {
    if (!date || !time || !doctor) {
      setAppointmentMessage('Por favor, complete todos los campos.');
      return;
    }

    const pacienteId = localStorage.getItem('usuarioId');
    if (!pacienteId) {
      setAppointmentMessage('No se pudo obtener el ID del paciente. Intente iniciar sesión nuevamente.');
      return;
    }

    try {
      const pacienteRespuesta = await axios.get(`http://localhost:3001/Usuarios/${pacienteId}`);
      const pacienteData = pacienteRespuesta.data;
      const pacienteNombre = pacienteData.Nombre;
      const pacienteEmail = pacienteData.Correo; // Suponiendo que tienes el correo almacenado

      const doctorSeleccionado = doctores.find(doc => doc.Nombre === doctor);

      if (!doctorSeleccionado) {
        setAppointmentMessage('Doctor no encontrado.');
        return;
      }

      const updatedHorarios = doctorSeleccionado.Horario.map(horario => {
        if (horario.fecha === date) {
          return {
            ...horario,
            horarios: horario.horarios.map(h => 
              h.hora === time ? { ...h, disponible: false } : h
            )
          };
        }
        return horario;
      });

      await axios.put(`http://localhost:3001/Usuarios/${doctorSeleccionado.id}`, {
        ...doctorSeleccionado,
        Horario: updatedHorarios
      });

      await axios.post('http://localhost:3001/CitasAgendadas', {
        PacienteId: pacienteId,
        PacienteNombre: pacienteNombre,
        DoctorId: doctorSeleccionado.id,
        DoctorNombre: doctorSeleccionado.Nombre,
        Especialidad: doctorSeleccionado.Especialidad,
        Fecha: date,
        Hora: time,
        Consultorio: doctorSeleccionado.Horario.find(h => h.fecha === date).horarios.find(h => h.hora === time).consultorio,
        Estado: 'Asignada'
      });

      // Enviar correo al paciente
      emailjs.send('service_jpf89ls', 'template_0n5yfpl', {
        to_name: pacienteNombre,  // Nombre del paciente
        doctor_name: doctorSeleccionado.Nombre,  // Nombre del doctor seleccionado
        specialty: doctorSeleccionado.Especialidad,  // Especialidad del doctor
        date: date,  // Fecha de la cita
        time: time,  // Hora de la cita
        consulting_room: doctorSeleccionado.Horario.find(h => h.fecha === date).horarios.find(h => h.hora === time).consultorio,  // Consultorio
        to_email: pacienteEmail  // Correo electrónico del paciente
        }, 'I20QJHbvYjkT3UX_N')
        .then((result) => {
            console.log('Correo enviado:', result.text);
        }, (error) => {
            console.error('Error al enviar el correo:', error.text);
        });
    

      setAppointmentMessage(`Cita agendada con éxito con el Dr. ${doctor} para el ${date} a las ${time}.`);

    } catch (error) {
      setAppointmentMessage('Hubo un problema al agendar la cita. Por favor, inténtelo de nuevo.');
      console.error('Error al agendar la cita:', error);
    }
  };

  if (loading) {
    return <div className='loading'>Cargando...</div>;
  }

  if (error) {
    return <div className='error'>{error}</div>;
  }

  const citasDisponibles = doctores.find(doctor => doctor.Nombre === selectedDoctor)?.Horario || [];

  return (
    <div className='horarios-container'>
      <NavBar />
      <div className='content'>
        <h1 className='title'>Horarios para {especialidad}</h1>

        <div className='direct-schedule'>
          <h2>Citas Disponibles</h2>
          <ul className='doctor-list'>
            {doctores.map((doctor, index) => (
              doctor.Horario.map((horario, citaIndex) => (
                horario.horarios.filter(cita => cita.disponible).map((cita, horaIndex) => (
                  <li key={`${index}-${citaIndex}-${horaIndex}`} className='doctor-item'>
                    <h3>Dr. {doctor.Nombre}</h3>
                    <p><strong>Fecha:</strong> {horario.fecha}</p>
                    <p><strong>Hora:</strong> {cita.hora}</p>
                    <p><strong>Consultorio:</strong> {cita.consultorio}</p>
                    <button 
                      className='select-appointment-button'
                      onClick={() => handleScheduleAppointment(doctor.Nombre, horario.fecha, cita.hora)}
                      style={{
                        padding: '10px 15px', 
                        backgroundColor: '#00bcd4', 
                        color: '#fff', 
                        border: 'none', 
                        borderRadius: '5px', 
                        cursor: 'pointer'}}
                    >
                      Agendar Cita
                    </button>
                  </li>
                ))
              ))
            ))}
          </ul>
        </div>

        <div className='select-schedule'>
          <h2>Elige un Doctor y Cita</h2>
          <div className='doctor-selection'>
            <label htmlFor='doctor-select'>Selecciona un doctor:</label>
            <select
              id='doctor-select'
              value={selectedDoctor}
              onChange={handleDoctorChange}
            >
              <option value=''>--Selecciona un doctor--</option>
              {doctores.map((doctor, index) => (
                <option key={index} value={doctor.Nombre}>
                  Dr. {doctor.Nombre}
                </option>
              ))}
            </select>
          </div>

          {selectedDoctor && (
            <div className='appointment-selection'>
              <label htmlFor='appointment-date'>Selecciona una fecha:</label>
              <input
                type='date'
                id='appointment-date'
                value={selectedDate}
                onChange={handleDateChange}
              />
              <label htmlFor='appointment-time'>Selecciona una hora:</label>
              <select
                id='appointment-time'
                value={selectedTime}
                onChange={handleTimeChange}
              >
                <option value=''>--Selecciona una hora--</option>
                {citasDisponibles
                  .filter(horario => horario.fecha === selectedDate)
                  .flatMap(horario =>
                    horario.horarios
                      .filter(h => h.disponible)
                      .map((cita, horaIndex) => (
                        <option key={horaIndex} value={cita.hora}>
                          {cita.hora}
                        </option>
                      ))
                  )}
              </select>

              <button 
                className='schedule-appointment-button'
                onClick={() => handleScheduleAppointment(selectedDoctor, selectedDate, selectedTime)}
                style={{
                  padding: '10px 15px', 
                  backgroundColor: '#00bcd4', 
                  color: '#fff', 
                  border: 'none', 
                  borderRadius: '5px', 
                  cursor: 'pointer'}}
              >
                Agendar Cita
              </button>
            </div>
          )}
        </div>

        {appointmentMessage && (
          <div className='appointment-message'>{appointmentMessage}</div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Horarios;

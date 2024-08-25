import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './consultaUsuario.css';
import NavBar from '../../Componentes/navBarAsesor';
import Footer from '../../Componentes/footer';

function GestionarUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [rol, setRol] = useState('');
  const [especialidad, setEspecialidad] = useState('');
  const [horarios, setHorarios] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const { data } = await axios.get('http://localhost:3001/Usuarios/');
        setUsuarios(data);
      } catch (err) {
        console.error('Error al obtener usuarios', err);
      }
    };
    fetchUsuarios();
  }, []);

  const buscarUsuario = async () => {
    try {
      const usuarioFiltrado = usuarios.find(
        (usuario) =>
          usuario.Correo.toLowerCase() === busqueda.toLowerCase() ||
          usuario.Nombre.toLowerCase() === busqueda.toLowerCase()
      );

      if (usuarioFiltrado) {
        setUsuarioSeleccionado(usuarioFiltrado);
        setNombre(usuarioFiltrado.Nombre);
        setCorreo(usuarioFiltrado.Correo);
        setRol(usuarioFiltrado.Rol);
        setEspecialidad(usuarioFiltrado.Rol === 'Doctor' ? usuarioFiltrado.Especialidad || '' : '');
        setHorarios(usuarioFiltrado.Rol === 'Doctor' ? usuarioFiltrado.Horario || [] : []);
        setError('');
      } else {
        setUsuarioSeleccionado(null);
        setError('Usuario no encontrado.');
      }
    } catch (err) {
      setError('Error al buscar el usuario.');
      console.error(err);
    }
  };

  const actualizarUsuario = async () => {
    if (!usuarioSeleccionado) return;
    try {
      await axios.patch(`http://localhost:3001/Usuarios/${usuarioSeleccionado.id}`, {
        Nombre: nombre,
        Correo: correo,
        Rol: rol,
        Especialidad: rol === 'Doctor' ? especialidad : '',
        Horario: rol === 'Doctor' ? horarios : [],
      });
      setError('Usuario actualizado con éxito.');
      setUsuarioSeleccionado(null);
      setNombre('');
      setCorreo('');
      setRol('');
      setEspecialidad('');
      setHorarios([]);
      // Actualizar la lista de usuarios después de la actualización
      const { data } = await axios.get('http://localhost:3001/Usuarios/');
      setUsuarios(data);
    } catch (err) {
      setError('Error al actualizar el usuario.');
      console.error(err);
    }
  };

  const handleHorarioChange = (index, field, value) => {
    const newHorarios = [...horarios];
    newHorarios[index] = { ...newHorarios[index], [field]: value };
    setHorarios(newHorarios);
  };

  return (
    <div>
      <NavBar />
      <div className="gestionar-usuarios">
        <h2>Gestionar Usuarios</h2>
        <input
          type="text"
          placeholder="Buscar por nombre o correo"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && buscarUsuario()}
        />
        <button onClick={buscarUsuario}>Buscar</button>
        {error && <p className="error">{error}</p>}
        {usuarioSeleccionado && (
          <div className="usuario-detalles">
            <h3>Detalles del Usuario</h3>
            <p><strong>Nombre:</strong> {nombre}</p>
            <p><strong>Correo:</strong> {correo}</p>
            <div className="filtro-roles">
              <label htmlFor="rol">Rol:</label>
              <select
                id="rol"
                value={rol}
                onChange={(e) => {
                  setRol(e.target.value);
                  if (e.target.value !== 'Doctor') {
                    setEspecialidad('');
                    setHorarios([]);
                  }
                }}
              >
                <option value="">Selecciona un rol</option>
                <option value="Paciente">Paciente</option>
                <option value="Doctor">Doctor</option>
                <option value="Asesor">Asesor</option>
              </select>
            </div>
            {rol === 'Doctor' && (
              <div className="horarios">
                <h4>Horarios del Doctor</h4>
                {horarios.map((horario, index) => (
                  <div key={index} className="horario-item">
                    <input
                      type="date"
                      value={horario.fecha}
                      onChange={(e) => handleHorarioChange(index, 'fecha', e.target.value)}
                    />
                    <input
                      type="time"
                      value={horario.hora}
                      onChange={(e) => handleHorarioChange(index, 'hora', e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Consultorio"
                      value={horario.consultorio}
                      onChange={(e) => handleHorarioChange(index, 'consultorio', e.target.value)}
                    />
                    <label>
                      Disponible:
                      <input
                        type="checkbox"
                        checked={horario.disponible}
                        onChange={(e) => handleHorarioChange(index, 'disponible', e.target.checked)}
                      />
                    </label>
                  </div>
                ))}
                <button onClick={() => setHorarios([...horarios, { fecha: '', hora: '', consultorio: '', disponible: true }])}>
                  Añadir Horario
                </button>
              </div>
            )}
            <button onClick={actualizarUsuario}>Actualizar</button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default GestionarUsuarios;

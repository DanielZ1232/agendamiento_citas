import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [Nombre, setNombre] = useState('');
  const [Correo, setEmail] = useState('');
  const [Contraseña, setPassword] = useState('');
  const navigate = useNavigate();

  const manejarRegistro = async (e) => {
    e.preventDefault();

    try {
      const nuevoUsuario = {
        id: Date.now().toString(), // Generar un ID único
        Nombre: Nombre,
        Correo: Correo,
        Contraseña: Contraseña,
        Rol: 'Paciente', // Asignar el rol de Paciente
        Horario: [] // Agregar el campo Horario vacío
      };

      await axios.post('http://localhost:3001/Usuarios/', nuevoUsuario);

      alert('Usuario registrado con éxito');
      navigate('/'); 
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      alert('Error al registrar usuario');
    }
  };

  return (
    <center>    
      <div className="register-box" style={{ padding: '20px' }}>
        <div className="register-logo">
          <Link to=""><b>TuDoctor</b>Online</Link>
        </div>
        <div className="card" style={{ width: '100%' }}>
          <div className="card-body register-card-body">
            <p className="login-box-msg">Registrarme en el Sistema</p>
            <form onSubmit={manejarRegistro}>
              <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Nombre" value={Nombre} onChange={(e) => setNombre(e.target.value)} required />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input type="email" className="form-control" placeholder="Correo" value={Correo} onChange={(e) => setEmail(e.target.value)} required />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input type="password" className="form-control" placeholder="Contraseña" value={Contraseña} onChange={(e) => setPassword(e.target.value)} required id="pass1" />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input type="password" className="form-control" placeholder="Confirma tu contraseña" id="pass2"/>
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-4">
                  <button type="submit" className="btn btn-primary btn-block" style={{ width: '120px' }}>
                    Registrarme
                  </button>
                </div>
              </div>
            </form>
            <br></br>
            <Link to="/" className="text-center">Ya tienes cuenta? Inicia Sesion</Link>
          </div>
        </div>
      </div>
    </center>
  );
}

export default Register;

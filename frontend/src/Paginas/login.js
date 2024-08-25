import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Login = () => {
    const [Correo, setEmail] = useState('');
    const [Contraseña, setPassword] = useState('');
    const navigate = useNavigate();

    const manejarInicioSesion = async (e) => {
        e.preventDefault();
    
        try {
            const respuesta = await axios.get('http://localhost:3001/Usuarios/');
            const usuarios = respuesta.data;
    
            // Verificar si el usuario existe y si la contraseña es correcta
            const usuario = usuarios.find(
                user => user.Correo === Correo && user.Contraseña === Contraseña
            );
    
            if (usuario) {
                alert('Inicio de sesión exitoso');
                
                // Guardar el ID del usuario en localStorage
                localStorage.setItem('usuarioId', usuario.id);
    
                // Redirigir basado en el rol del usuario
                switch (usuario.Rol) {
                    case 'Paciente':
                        navigate('/inicioPaciente');
                        break;
                    case 'Doctor':
                        navigate('/inicioDoctor');
                        break;
                    case 'Asesor':
                        navigate('/inicioAsesor');
                        break;
                    default:
                        alert('Rol desconocido');
                        break;
                }
            } else {
                alert('Correo o contraseña incorrectos');
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            alert('Error al iniciar sesión');
        }
    };

    return (
        <center>
            <div className="login-box" style={{
                padding: '10px',
                marginTop: '90px',
                background: 'fff'
            }}>
                <div className="login-logo">
                    <Link to=""><b>TuDoctor</b>Online</Link>
                </div>
                <div className="card" 
                    style={{
                        padding: '10px'
                    }}>
                    <div className="card-body login-card-body">
                        <p className="login-box-msg">Inicia Sesión</p>
                        <form onSubmit={manejarInicioSesion}>
                            <div className="input-group mb-3">
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    placeholder="Correo" 
                                    value={Correo} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    required 
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    placeholder="Contraseña" 
                                    value={Contraseña} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    required 
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-4">
                                    <button 
                                        type="submit" 
                                        className="btn btn-primary btn-block"
                                        style={{
                                            marginLeft: '88px'
                                        }}
                                    >
                                        Entrar
                                    </button>
                                </div>
                            </div>
                        </form>
                        <p className="mb-1">
                            <Link to="forgot-password.html" style={{
                                padding: '10px'
                            }}>¿Olvidó su contraseña?</Link>
                        </p>
                        <p className="mb-0">
                            <Link to="/register" className="text-center">Registrarme</Link>
                        </p>
                    </div>
                </div>
            </div>
        </center>
    );
}

export default Login;

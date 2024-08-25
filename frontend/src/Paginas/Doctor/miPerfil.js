import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import NavBar from '../../Componentes/navBarDoctor';
import Footer from '../../Componentes/footer';

function PerfilDoctor() {
    const [usuario, setUsuario] = useState({
        Nombre: '',
        Correo: '',
        Rol: '',
        Contraseña: '',
        Especialidad: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const usuarioId = localStorage.getItem('usuarioId');

    useEffect(() => {
        const fetchUsuario = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/Usuarios/${usuarioId}`);
                setUsuario(response.data);
            } catch (error) {
                console.error('Error al obtener los datos del usuario:', error);
            }
        };

        fetchUsuario();
    }, [usuarioId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsuario((prevUsuario) => ({
            ...prevUsuario,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3001/Usuarios/${usuarioId}`, usuario);
            alert('Perfil actualizado con éxito');
        } catch (error) {
            console.error('Error al actualizar el perfil:', error);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div>
            <NavBar />
            <div style={{ padding: '20px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Perfil de Doctor</h2>
                <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto', backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Nombre:</label>
                        <input
                            type="text"
                            name="nombre"
                            value={usuario.Nombre}
                            onChange={handleChange}
                            disabled
                            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Correo:</label>
                        <input
                            type="email"
                            name="correo"
                            value={usuario.Correo}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Rol:</label>
                        <input
                            type="text"
                            name="rol"
                            value={usuario.Rol}
                            onChange={handleChange}
                            disabled
                            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: '#e9e9e9' }}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Especialidad:</label>
                        <input
                            type="text"
                            name="especialidad"
                            value={usuario.Especialidad}
                            onChange={handleChange}
                            disabled
                            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: '#e9e9e9' }}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Horario:</label>
                        <input
                            type="text"
                            name="horario"
                            value="De Martes a Domingo, 5am hasta las 2pm"
                            onChange={handleChange}
                            disabled
                            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: '#e9e9e9' }}
                        />
                    </div>
                    <div style={{ marginBottom: '20px', position: 'relative' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Contraseña:</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="contraseña"
                            value={usuario.Contraseña}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', paddingRight: '45px' }} // Cambié el paddingRight
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            style={{
                                marginTop: '12px',
                                position: 'absolute',
                                right: '12px', // Ajusté la posición del ícono
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: '#555',
                                padding: '0', // Removí el padding del botón
                            }}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    <button
                        type="submit"
                        style={{
                            padding: '10px 15px',
                            backgroundColor: '#00bcd4',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            width: '100%',
                            fontWeight: 'bold',
                        }}
                    >
                        Guardar Cambios
                    </button>
                </form>
            </div>
            <Footer />
        </div>
    );
}

export default PerfilDoctor;

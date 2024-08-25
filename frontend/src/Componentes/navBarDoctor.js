import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../utils/logo.png';
import './navbar.css';

function NavBar() {
    const navigate = useNavigate();
    const handleLogout = () => {
        // Elimina la información de sesión
        localStorage.removeItem('user'); 
        sessionStorage.removeItem('user'); 
        navigate('/');
    };

    const goToProfile = () => {
        navigate('/perfilDoctor'); // Ruta que lleva a la página de perfil del usuario
    };
    return (
        <nav className="nav">
            <div className="nav-left">
                <img src={Logo} alt="Logo" height="50px" />
                <h1 className="nav-title">TuDoctorOnline</h1>
            </div>
            <ul className="nav-links">
                <li>
                    <button onClick={() => navigate('/inicioDoctor')} className="nav-button">
                        Inicio
                    </button>
                </li>
                <li>
                    <button onClick={goToProfile} className="nav-button">
                        Ver Perfil
                    </button>
                </li>
                <li>
                    <button onClick={handleLogout}className="nav-button">
                        Cerrar Sesión
                    </button>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;

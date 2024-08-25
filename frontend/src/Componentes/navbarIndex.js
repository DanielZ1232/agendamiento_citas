import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignInAlt } from 'react-icons/fa'; 
import Logo from '../utils/logo.png';
import './navbar.css';

function NavBarIndex() {
    const navigate = useNavigate();
    return (
        <nav className="nav" style={styles.nav}>
            <div style={styles.navLeft}>
                <img src={Logo} alt="Logo" height="50px" />
                <h1 style={styles.navTitle}>TuDoctorOnline</h1>
            </div>
            <ul style={styles.navLinks}>
                <li>
                    <button onClick={() => navigate('/login')} style={styles.navButton}>
                        <FaSignInAlt style={styles.icon} /> {/* Agrega el ícono aquí */}
                        Iniciar Sesión
                    </button>
                </li>
            </ul>
        </nav>
    );
}

const styles = {
    nav: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        color: '#fff',
    },
    navLeft: {
        display: 'flex',
        alignItems: 'center',
    },
    navTitle: {
        marginLeft: '10px',
        fontSize: '24px',
    },
    navLinks: {
        listStyle: 'none',
        display: 'flex',
        margin: 0,
        padding: 0,
    },
    navButton: {
        backgroundColor: 'transparent',
        border: 'none',
        color: '#fff',
        fontSize: '16px',
        cursor: 'pointer',
        marginLeft: '20px',
        display: 'flex',
        alignItems: 'center',
    },
    icon: {
        marginRight: '5px',
        fontSize: '18px',
    },
};

export default NavBarIndex;

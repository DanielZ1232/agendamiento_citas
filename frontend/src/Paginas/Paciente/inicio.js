import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Componentes/styleinicio.css';
import NavBar from '../../Componentes/navBar';
import Footer from '../../Componentes/footer';
import { AiOutlinePlusCircle, AiOutlineSearch } from 'react-icons/ai'; 

function Inicio() {
  const navigate = useNavigate();

  return (
    <div>
      <NavBar />
      <div className="container">
        <h1 className="title">Bienvenido a la Plataforma de Agendamiento Médico</h1>

        <div className="card-container">
          {/* Tarjeta de Solicitar Cita */}
          <div className="card" onClick={() => navigate('/seleccionarArea')}>
            <AiOutlinePlusCircle size={40} className="icon" />
            <h2>Solicitar Cita</h2>
            <p>Realice el agendamiento de citas</p>
          </div>

          {/* Tarjeta de Gestionar Cita */}
          <div className="card" onClick={() => navigate('/citas')}>
            <AiOutlineSearch size={40} className="icon" />
            <h2>Gestionar Cita</h2>
            <p>Consulte o cancele sus citas agendadas</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Inicio;

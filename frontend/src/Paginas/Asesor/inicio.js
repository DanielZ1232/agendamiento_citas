import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Componentes/styleinicio.css';
import NavBar from '../../Componentes/navBarAsesor';
import Footer from '../../Componentes/footer';
import { AiOutlinePlusCircle, AiOutlineSearch } from 'react-icons/ai'; 

function InicioAsesor() {
  const navigate = useNavigate();

  return (
    <div>
      <NavBar />
      <div className="container">
        <h1 className="title">Bienvenido a la Plataforma, Asesor</h1>

        <div className="card-container">
        <div className="card" onClick={() => navigate('/seleccionarAreaAsesor')}>
            <AiOutlinePlusCircle size={40} className="icon" />
            <h2>Solicitar Cita</h2>
            <p>Realice el agendamiento de citas</p>
          </div>

          {/* Tarjeta de Gestionar Cita */}
          <div className="card" onClick={() => navigate('/citasA')}>
            <AiOutlineSearch size={40} className="icon" />
            <h2>Gestionar Citas</h2>
            <p>Consulte todas sus citas</p>
          </div>

          <div className="card" onClick={() => navigate('/consultarUsuarios')}>
            <AiOutlineSearch size={40} className="icon" />
            <h2>Usuarios</h2>
            <p>Consulte o actualice los usuarios del Sistema</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default InicioAsesor;

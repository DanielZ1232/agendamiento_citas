import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Componentes/styleinicio.css';
import NavBar from '../../Componentes/navBarAsesor';
import Footer from '../../Componentes/footer';
import { AiOutlineSearch } from 'react-icons/ai'; 

function InicioDoctor() {
  const navigate = useNavigate();

  return (
    <div>
      <NavBar />
      <div className="container">
        <h1 className="title">¿Que citas quieres ver?</h1>

        <div className="card-container">
        <div className="card" onClick={() => navigate('/citasDelAsesor')}>
            <AiOutlineSearch size={40} className="icon" />  
            <h2>Mis Citas</h2>
            <p>Consulte o cancelar tus citas agendadas</p>
          </div>

          {/* Tarjeta de Gestionar Cita */}
          <div className="card" onClick={() => navigate('/consultarCitas')}>
            <AiOutlineSearch size={40} className="icon" />
            <h2>Citas Asignadas</h2>
            <p>Consulte las citas asignadas a ti</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default InicioDoctor;
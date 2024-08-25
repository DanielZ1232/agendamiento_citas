import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InicioPaciente from './Paginas/Paciente/inicio';
import PerilPaciente from './Paginas/Paciente/miPerfil';
import InicioMedico from './Paginas/Doctor/inicio';
import Horarios from './Paginas/Paciente/horarios';
import HorariosDoctor from './Paginas/Doctor/horariosDoctor';
import SeleccionarAreaMedica from './Paginas/Paciente/seleccionarAreaMedica';
import SeleccionarAreaMedicaDoctor from './Paginas/Doctor/seleccionarAreaMedicoDoctor';
import CitasPaciente from './Paginas/Paciente/citasPaciente';
import CitasDoctor from './Paginas/Doctor/citasDoctor';
import CitasDelDoctor from './Paginas/Doctor/citasDelDoctor';
import CitasD from './Paginas/Doctor/citasD';
import PerilDoctor from './Paginas/Doctor/miPerfil';
import Login from './Paginas/login';
import Register from './Paginas/register';
import Index from './Paginas/index';
import InicioAsesor from './Paginas/Asesor/inicio';
import SeleccionarAreaMedicaAsesor from './Paginas/Asesor/seleccionarAreaMedicoAsesor';
import CitasA from './Paginas/Asesor/citasA';
import HorariosAsesor from './Paginas/Asesor/horariosAsesor';
import CitasDelAsesor from './Paginas/Asesor/citasDelAsesor';
import ConsultarCitas from './Paginas/Asesor/consultarCitas';
import ConsultarUsuarios from './Paginas/Asesor/consultaUsuario';
import PerilAsesor from './Paginas/Asesor/miPerfil';



function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path="/inicioPaciente" element={<InicioPaciente />} />
        <Route path="/horarios" element={<Horarios />} />
        <Route path="/horariosDoctor" element={<HorariosDoctor />} />
        <Route path="/seleccionarArea" element={<SeleccionarAreaMedica />} />
        <Route path="/seleccionarAreaDoctor" element={<SeleccionarAreaMedicaDoctor />} />
        <Route path="/citas" element={<CitasPaciente />} />
        <Route path="/citasD" element={<CitasD />} />
        <Route path="/citasDoctor" element={<CitasDoctor />} />
        <Route path="/citasDelDoctor" element={<CitasDelDoctor />} />
        <Route path="/inicioDoctor" element={<InicioMedico />} />
        <Route path="/inicioAsesor" element={<InicioAsesor />} />
        <Route path="/seleccionarAreaAsesor" element={<SeleccionarAreaMedicaAsesor />} />
        <Route path="/citasA" element={<CitasA />} />
        <Route path="/horariosAsesor" element={<HorariosAsesor />} />
        <Route path="/citasDelAsesor" element={<CitasDelAsesor />} />
        <Route path="/consultarCitas" element={<ConsultarCitas />} />
        <Route path="/consultarUsuarios" element={<ConsultarUsuarios />} />
        <Route path="/perfil" element={<PerilPaciente />} />
        <Route path="/perfilDoctor" element={<PerilDoctor />} />
        <Route path="/perfilAsesor" element={<PerilAsesor />} />

      </Routes>
    </Router>
  );
}

export default App;

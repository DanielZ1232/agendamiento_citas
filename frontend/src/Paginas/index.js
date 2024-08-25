import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import NavBarIndex from '../Componentes/navbarIndex';
import FooterIndex from '../Componentes/footerIndex';
import MedicinaGeneral from '../utils/Imagenes/medicinaGeneral.jpg';
import Pediatria from '../utils/Imagenes/pediatria.jpg';
import Cardiologia from '../utils/Imagenes/cardiologia.jpg';
import Dermatologia from '../utils/Imagenes/dermatologia.jpg';
import Ginecologia from '../utils/Imagenes/ginecologia.avif';
import Oftalmología from '../utils/Imagenes/oftalmologia.jpg';
import Otorrinolaringologia from '../utils/Imagenes/otorrinolaringologia.avif';
import Neurologia from '../utils/Imagenes/neurologia.jpg';
import Endocrinologia from '../utils/Imagenes/endocrinologia.jpg';
import Psiquiatria from '../utils/Imagenes/psiquiatria.webp';
import Urologia from '../utils/Imagenes/urologia.jpg';
import Traumatologia from '../utils/Imagenes/traumatologia.jpg';
import Odontologia from '../utils/Imagenes/odontologia.avif';

function Index() {
    const navigate = useNavigate();

    const medicalAreas = [
        { name: 'Medicina General', image: MedicinaGeneral },
        { name: 'Pediatría', image: Pediatria },
        { name: 'Cardiología', image: Cardiologia },
        { name: 'Dermatología', image: Dermatologia },
        { name: 'Ginecología', image: Ginecologia },
        { name: 'Oftalmología', image: Oftalmología },
        { name: 'Otorrinolaringología', image: Otorrinolaringologia },
        { name: 'Neurología', image: Neurologia },
        { name: 'Endocrinología', image: Endocrinologia },
        { name: 'Psiquiatría', image: Psiquiatria },
        { name: 'Urología', image: Urologia },
        { name: 'Traumatología', image: Traumatologia },
        { name: 'Odontologia', image: Odontologia },
    ];

    const handleAreaClick = () => {
        navigate('/login');
    };

    return (
    <div>
        <NavBarIndex />

        <div style={{padding: '60px',
            display: 'flex',
            width: '75%',
            marginLeft: '12%'
        }}>
            <center>
            <h1 style={{
                fontSize: '30px',
                color: '#333'
            }}>Bienvenido a TuDoctorOnline</h1>
            <br></br>
            <p style={{
                fontSize: '20px'
            }}>En TuDoctorOnline, estamos comprometidos con ofrecerte una experiencia de agendamiento de citas médicas fácil, rápida y eficiente. 
                Nuestra plataforma fue diseñada con el objetivo de simplificar el proceso de programación de consultas médicas, 
                conectando a pacientes con profesionales de la salud de manera cómoda y segura.</p>
            </center>
        </div>
        <div style={styles.container}>
            <h1 style={styles.heading}>Explora Nuestras Áreas Médicas</h1>
            <Carousel
                showThumbs={false}
                autoPlay
                infiniteLoop
                showStatus={false}
                interval={3000}
                showArrows={true}
                dynamicHeight={false}
                stopOnHover={true}
            >
                {medicalAreas.map((area, index) => (
                    <div key={index} style={styles.carouselItem} onClick={handleAreaClick}>
                        <img src={area.image} alt={area.name} style={styles.image} />
                        <p className="legend" style={styles.legend}>{area.name}</p>
                    </div>
                ))}
            </Carousel>

            <div style={{padding: '60px 40px',
            display: 'flex',
            width: '100%',
            gap: '100px'

        }}>
            <div style={{
            }}>
            <h1 style={{
                fontSize: '30px',
                color: '#333',
                textAlign: 'center'
            }}>¿Quiénes Somos?
            </h1>
            <br></br>
            <p style={{
                fontSize: '20px',
                padding: '3px'
            }}>Somos un equipo de profesionales de la tecnología y la salud dedicados a mejorar la forma en que las personas acceden a los servicios médicos. 
            Con años de experiencia en ambos campos, entendemos la importancia de una atención médica oportuna y la necesidad de un sistema de agendamiento eficiente.
            </p>
            </div>
            <div>
            <h1 style={{
                fontSize: '30px',
                color: '#333',
                padding: '2.2px'
            }}>Nuestra Misión
            </h1>
            <br></br>
            <p style={{
                fontSize: '20px',
            }}>
            Nuestra misión es facilitar el acceso a la atención médica mediante una plataforma intuitiva que permita a los pacientes programar citas de manera digital. 
            Queremos reducir las barreras y el estrés asociado con la programación de consultas, asegurándonos de que cada paciente pueda recibir la atención que necesita sin complicaciones.
            </p>
            </div>
            <div>
            <h1 style={{
                fontSize: '30px',
                color: '#333'
            }}>Nuestro Compromiso
            </h1>
            <br></br>
            <p style={{
                fontSize: '20px'
            }}>
            En TuDoctorOnline, estamos comprometidos con la excelencia y la innovación. 
            Nos esforzamos continuamente para mejorar nuestra plataforma y ofrecerte un servicio que cumpla con tus expectativas y necesidades. 
            Tu salud y bienestar son nuestra prioridad.
            </p>
            </div>
        </div>
        </div>
        <FooterIndex />
    </div>
    );
}

const styles = {
    container: {
        padding: '20px',
        maxWidth: '900px',
        margin: '0 auto',
        
    },
    heading: {
        color: '#333',
        marginBottom: '20px',
        fontSize: '28px',
        textAlign: 'center'
    },
    carouselItem: {
        cursor: 'pointer',
    },
    image: {
        maxHeight: '450px',
        objectFit: 'cover',
        borderRadius: '10px',
    },
    legend: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: '10px',
        borderRadius: '8px',
        color: '#fff',
        fontSize: '20px',
    },
};

export default Index;

import React from 'react';

function Footer() {
    return (
        <footer style={styles.footer}>
            <div style={styles.container}>
                <div style={styles.column}>
                    <h4>Síguenos</h4>
                    <div style={styles.socialIcons}>
                        <a href="https://facebook.com" style={styles.socialLink}>Facebook</a>
                        <a href="https://twitter.com" style={styles.socialLink}>Twitter</a>
                        <a href="https://instagram.com" style={styles.socialLink}>Instagram</a>
                    </div>
                </div>
            </div>
            <div style={styles.copyright}>
                <p> &copy; 2024 TuDoctorOnline. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
}

const styles = {
    footer: {
        backgroundColor: '#333',
        color: '#fff',
        padding: '20px 0',
        textAlign: 'center',
        bottom: 0,
    },
    container: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '0 20px',
        flexWrap: 'wrap',
    },
    column: {
        flex: '1',
        minWidth: '200px',
        margin: '10px 0',
    },
    list: {
        listStyle: 'none',
        padding: 0,
    },
    link: {
        color: '#00bcd4',
        textDecoration: 'none',
        marginBottom: '5px',
        display: 'block',
    },
    socialIcons: {
        display: 'flex',
        justifyContent: 'center',
        gap: '15px',
    },
    socialLink: {
        color: '#00bcd4',
        textDecoration: 'none',
    },
    copyright: {
        marginTop: '10px',
        borderTop: '1px solid #555',
        paddingTop: '10px',
    },
};

export default Footer;

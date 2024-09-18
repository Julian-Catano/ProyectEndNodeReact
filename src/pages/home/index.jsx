import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Login from '@pages/auth/login'

const Home = () => {

    return (
        <>
        <Container>
            <h1>Bienvenidos a Recetapp</h1>

            <Button variant="contained" href="/login">
                Iniciar Sesión
            </Button>
        </Container>
        </>
    )
}

export default Home;
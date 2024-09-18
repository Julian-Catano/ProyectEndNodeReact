
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Recetas from '@components/MisRecetas/OtrasRecetas';
// import DeleteUser from '@components/molecules/Users/DeleteUser/DeleteUser';

export default function MisRecetas() {

    const navigate = useNavigate();
    const [load, setLoad] = useState(false);
    const [idDelete, setIdDelete] = useState('');
    const [idUpdate, setIdUpdate] = useState('');
    const user = useSelector(state => state.auth.user);
    const loading = useSelector(state => state.auth.loading);

    if (loading) {
      return <>Cargando...</>;
    }

    if (!user) {
      return navigate("/login");
    }

  return (
    <>
        <Container maxWidth="lg" sx={{ mt: 5 }}>
            <Recetas idUpdate={idUpdate} load={load} setLoad={setLoad} />
        </Container>
    </>
  );
}
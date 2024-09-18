
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import CreateReceta from '@components/MisRecetas/CreateReceta';
import ConsultRecetas from '@components/MisRecetas/ConsultRecetas';
// import DeleteUser from '@components/molecules/Users/DeleteUser/DeleteUser';
import UpdateReceta from '@components/MisRecetas/UpdateReceta';

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
            <CreateReceta load={load} setLoad={setLoad} />
            <ConsultRecetas load={load} setIdDelete={setIdDelete} setIdUpdate={setIdUpdate} /> 
            {/* <DeleteUser idDelete={idDelete} load={load} setLoad={setLoad} /> */}
            <UpdateReceta idUpdate={idUpdate} load={load} setLoad={setLoad} />
        </Container>
    </>
  );
}
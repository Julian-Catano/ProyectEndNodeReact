
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
//import CreateUser from '@components/molecules/Users/CreateUser/CreateUser';
import ConsulUser from '@components/Profile/ConsultUser';
// import DeleteUser from '@components/molecules/Users/DeleteUser/DeleteUser';
import UpdateUser from '@components/Profile/UpdateUser';

export default function Profile() {

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
            {/* <CreateUser load={load} setLoad={setLoad} /> */}
            <ConsulUser load={load} setIdDelete={setIdDelete} setIdUpdate={setIdUpdate} /> 
            {/* <DeleteUser idDelete={idDelete} load={load} setLoad={setLoad} /> */}
            <UpdateUser idUpdate={idUpdate} load={load} setLoad={setLoad} />
        </Container>
    </>
  );
}
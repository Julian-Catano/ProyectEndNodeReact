import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogin } from '@lib/slice/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)
    const loading = useSelector(state => state.auth.loading)
console.log(user)
    if (loading) {
        return <>Cargando...</>;
    }

    if (user) {
        return navigate("/perfil");
    }

     return (
        <>
            <Button href="/">
                Volver
            </Button>
            <Container>
                <Formik
                    initialValues={{ 
                        email: '',
                        password: '',
                    }}
                    validationSchema={Yup.object({
                    email: Yup.string().email('Dirección de email invalida').required('Este campo es obligario'),
                    password: Yup.string()
                        .min(2, 'La contraseña debe ser mínimo de 2 caracteres')
                        .required('Este campo es obligario'),
                    })}
                    onSubmit={async(values, { setSubmitting }) => {
                        const response = await dispatch(fetchLogin(values));
                        console.log(response.payload.user)
                        if (response.payload.user) {
                            return navigate("/perfil");
                        }
                    }}
                >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    /* and other goodies */
                }) => (
                    <form onSubmit={handleSubmit}>        

                        <TextField
                            sx={{ mt: 3 }}
                            fullWidth
                            id="outlined-basic"
                            name='email'
                            label="Email" 
                            variant="outlined"
                            onChange={handleChange}
                            value={values.email}
                            error={!!errors.email}
                            helperText={errors.email}
                        />

                        <TextField 
                            sx={{mt: 3}}
                            fullWidth
                            type='password'
                            id="outlined-basic"
                            name='password'
                            label="Contraseña" 
                            variant="outlined"
                            onChange={handleChange}
                            value={values.password}
                            error={!!errors.password}
                            helperText={errors.password}
                        />

                        <Button type='submit'>
                            Iniciar Sesión
                        </Button>
                    </form>
                    )}
                </Formik>
            </Container>
        </>
     )
}

export default Login
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';

export default function ConsulUser({load, setIdUpdate, setIdDelete}) {

    const [formData, setFormData] = useState({});
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)
    

    useEffect(() => {
        const fetchData = async () => {
            console.log('ddddd', Cookies.get('token'));
            const response = await axios.get(`${import.meta.env.VITE_URL_SERVER}api/users/consult-user-Id/` + user.id, {}, {
                headers: {
                    'x-token': Cookies.get('token')
                }
            });
            console.log(response.data.users);
            setFormData(response.data.user);
        }
        fetchData();
    }, [load])

    return (
        <div>
         <Formik
          enableReinitialize
          initialValues={{
              id: formData.id,
              names: formData.names || '', 
              lastname: formData.lastname  || '',
              email: formData.email || ''
          }}
          validationSchema={Yup.object({
            names: Yup.string()
              .required('Este campo es obligario'),
            lastname: Yup.string()
              .required('Este campo es obligario'),
            email: Yup.string().email('Dirección de email invalida').required('Este campo es obligario')
          })}
          onSubmit={async(values, { setSubmitting }) => {
  
              const response = await axios.put('http://localhost:5000/api/users/update-users', values);
              // const response = await axios.put('http://localhost:3000/api/users/updateUser/' + idUpdate, values);
              setLoad(!load);
              setOpen(false);
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
                      sx={{ mt: 1 }}
                      fullWidth
                      id="outlined-basic"
                      name='names'
                      label="Nombres" 
                      variant="outlined"
                      onChange={handleChange}
                      value={values.names}
                      error={errors.names}
                      helperText={errors.names}
                  />
  
                  <TextField
                      sx={{ mt: 3 }}
                      fullWidth
                      id="outlined-basic"
                      name='email'
                      label="Email" 
                      variant="outlined"
                      onChange={handleChange}
                      value={values.email}
                      error={errors.email}
                      helperText={errors.email}
                  />
  
                  <TextField 
                    sx={{mt: 3}}
                    fullWidth
                    id="outlined-basic"
                    name='age'
                    label="Apellido"
                    variant="outlined"
                    onChange={handleChange}
                    value={values.lastname}
                    error={errors.lastname}
                    helperText={errors.lastname}
                  />
  
              <Button type='submit'>
                  Actualizar
              </Button>
          </form>
          )}
          </Formik>
      </div>
        // <TableContainer component={Paper}>
        //     <Table sx={{ minWidth: 650 }} aria-label="simple table">
        //         <TableHead>
        //         <TableRow>
        //             <TableCell>document</TableCell>
        //             <TableCell>names</TableCell>
        //             <TableCell>lastname</TableCell>
        //             <TableCell>email</TableCell>
        //             <TableCell>celphone</TableCell>
        //         </TableRow>
        //         </TableHead>
        //         <TableBody>
        //         {rows.map((row) => (
        //             <TableRow
        //             key={row.id}
        //             sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        //             >
        //             <TableCell component="th" scope="row">
        //                 <img width={100} src={`${import.meta.env.VITE_URL_SERVER}uploads/${row.photo}`}></img>
        //             </TableCell>
        //             <TableCell>{row.document}</TableCell>
        //             <TableCell>{row.names}</TableCell>
        //             <TableCell>{row.lastname}</TableCell>
        //             <TableCell>{row.email}</TableCell>
        //             <TableCell>{row.celphone}</TableCell>
        //             <TableCell>
        //                 <IconButton color="primary" aria-label="Editar" onClick={() => {handleUpdate(row.id)}}>
        //                     <EditIcon />
        //                 </IconButton>
        //                 <IconButton color="primary" aria-label="Eliminar" onClick={() => {handleDelete(row.id)}}>
        //                     <DeleteIcon />
        //                 </IconButton>
        //             </TableCell>
        //             </TableRow>
        //         ))}
        //         </TableBody>
        //     </Table>
        // </TableContainer>
    )
}
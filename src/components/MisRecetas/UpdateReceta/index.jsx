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

export default function ConsultRecetas({idUpdate, load, setLoad}) {

    const [formData, setFormData] = useState({});
    const user = useSelector(state => state.auth.user)
    

    useEffect(() => {
        const fetchData = async () => {
            console.log('idUpdateReceta', idUpdate)
            const response = await axios.get(`${import.meta.env.VITE_URL_SERVER}api/recetas/consult-receta-id/` + idUpdate, {}, {
                headers: {
                    'x-token': Cookies.get('token')
                }
            });
            console.log(response.data.receta);
            setFormData(response.data.receta);
        }
        fetchData();
    }, [idUpdate])

    return (
        <div>
         <Formik
          enableReinitialize
          initialValues={{
              id: formData.id,
              name: formData.name || '', 
              ingredients: formData.ingredients  || '',
              description: formData.description || '',
              userId: formData.userId
          }}
          validationSchema={Yup.object({
            name: Yup.string()
              .required('Este campo es obligario'),
            ingredients: Yup.string()
              .required('Este campo es obligario'),
            description: Yup.string()
              .required('Este campo es obligario')
          })}
          onSubmit={async(values, { setSubmitting }) => {
  
              const response = await axios.put('http://localhost:5000/api/recetas/update-receta', values);
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
                      name='name'
                      label="Nombre" 
                      variant="outlined"
                      onChange={handleChange}
                      value={values.name}
                      error={errors.name}
                      helperText={errors.name}
                  />
  
                  <TextField
                      sx={{ mt: 3 }}
                      fullWidth
                      id="outlined-basic"
                      name='ingredients'
                      label="Ingredientes" 
                      variant="outlined"
                      onChange={handleChange}
                      value={values.ingredients}
                      error={errors.ingredients}
                      helperText={errors.ingredients}
                  />
  
                  <TextField 
                    sx={{mt: 3}}
                    fullWidth
                    id="outlined-basic"
                    name='description'
                    label="Descripción"
                    variant="outlined"
                    onChange={handleChange}
                    value={values.description}
                    error={errors.description}
                    helperText={errors.description}
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
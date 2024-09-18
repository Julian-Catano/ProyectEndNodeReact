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

export default function UpdateUser({idUpdate, load, setLoad}) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const consultUserById = async (id) => {
    const response = await axios.get(`http://localhost:5000/api/users/consult-user-Id/${id}`);
    console.log(response.data.user);
    setFormData(response.data.user);
  }

  useEffect(() => {
      if (idUpdate) {
        consultUserById(idUpdate);
      }
      setOpen(idUpdate ? true : false);
  }, [idUpdate])

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
       <Formik
        enableReinitialize
        initialValues={{
            id: idUpdate,
            names: formData.names || '', 
            email: formData.email || '',
            age: formData.age  || ''
        }}
        validationSchema={Yup.object({
          names: Yup.string()
            .required('Este campo es obligario'),
          email: Yup.string().email('Dirección de email invalida').required('Este campo es obligario'),
          age: Yup.number()
            .required('Este campo es obligario')
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
            <DialogTitle id="alert-dialog-title">
            {"Actualiza un usuario"}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">

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
                  label="Edad"
                  type="number"
                  variant="outlined"
                  onChange={handleChange}
                  value={values.age}
                  error={errors.age}
                  helperText={errors.age}
                />

            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button type='submit'>
                Actualizar
            </Button>
            </DialogActions>
        </form>
        )}
        </Formik>
      </Dialog>
    </div>
  );
}
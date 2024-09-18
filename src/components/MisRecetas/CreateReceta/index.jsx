import React, { useState } from 'react';
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

export default function CreateReceta({load, setLoad}) {
  const [open, setOpen] = useState(false);
 

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Crear Receta
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
       <Formik
        initialValues={{ 
            name: '', 
            ingredients: '',
            description: '',
            userId: 8
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

            const response = await axios.post(`${import.meta.env.VITE_URL_SERVER}api/recetas/create-receta`, values);
            console.log(response);
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
            {"Crear una nueva receta"}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">

              <TextField
                id="photo" // remove onBlur warning
                name="photo"
                type="file"
                onChange={(event) => {
                  const props = useFormikContext();
                  props.setFieldValue("file", event.currentTarget.files[0]);
                }}
              />

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
                    label="ingredients" 
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
                  label="description" 
                  variant="outlined"
                  onChange={handleChange}
                  value={values.description}
                  error={errors.description}
                  helperText={errors.description}
                />

                {/* <TextField 
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
                /> */}

            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button type='submit'>
                Crear
            </Button>
            </DialogActions>
        </form>
        )}
        </Formik>
      </Dialog>
    </div>
  );
}
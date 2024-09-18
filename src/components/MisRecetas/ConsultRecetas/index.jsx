import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardActions, Button, Typography, Grid, Container, IconButton } from '@mui/material';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';

export default function RecetasUsuario({ setIdUpdate, setIdDelete }) {
  const [recetas, setRecetas] = useState([]);
  const [load, setLoad] = useState(false);
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    const fetchRecetas = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_URL_SERVER}api/recetas/consult-my-receta/` + user.id, {}, {
          headers: {
              'x-token': Cookies.get('token')
          }
      });
      console.log(response.data.receta);
      setRecetas(response.data.receta);
      } catch (error) {
        console.error("Error al obtener las recetas", error);
      }
    };
    fetchRecetas();
  }, [load]);

  const handleUpdate = (id) => {
    setIdUpdate(id);
    setLoad(!load); // Actualiza las recetas tras la edición
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_URL_SERVER}api/recetas/${id}`, {
        headers: {
          'x-token': Cookies.get('token')
        }
      });
      setLoad(!load); // Recarga las recetas tras la eliminación
    } catch (error) {
      console.error("Error al eliminar la receta", error);
    }
  };

  return (
<TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Descripción</TableCell>
                    <TableCell>Ingredientes</TableCell>
                    <TableCell></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {recetas.map((row) => (
                    <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">
                        <img width={100} src={`${import.meta.env.VITE_URL_SERVER}uploads/${row.photo}`}></img>
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>{row.ingredients}</TableCell>
                    <TableCell>
                        <IconButton color="primary" aria-label="Editar" onClick={() => {handleUpdate(row.id)}}>
                            <EditIcon />
                        </IconButton>
                        <IconButton color="primary" aria-label="Eliminar" onClick={() => {handleDelete(row.id)}}>
                            <DeleteIcon />
                        </IconButton>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
  );
}
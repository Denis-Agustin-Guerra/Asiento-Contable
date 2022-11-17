import React, { useEffect,useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button,IconButton, TextField,Grid,Box, Typography} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from "axios";

const useStyles = makeStyles((theme)=>({
  table: {
    minWidth: 650,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3),
    width:390,
    height:350
  },
  formControl: {
      margin: theme.spacing(0),
      minWidth: 180,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
}));

function TablaCuentas(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
 
  const tipoCuentaText=['Activo','Pasivo','Gastos','Ingresos']
  const jerarquia=['Troncal','Divisionaria','Especifica']

  const [codCuenta,setCodCuenta]=useState('');
  const [descripcion,setDescripcion]=useState('');
  const [codJerarquia,setCodJerarquia]=useState('');
  const [tipoCuenta,setTipoCuenta]=useState('');
  const [anteriorJerarquia,setAnteriorJerarquia]=useState('');
  
  const handleOpen = (row) => {
    setOpen(true);
    setCodCuenta(row.cod_cuenta)
    setDescripcion(row.des_cuenta)
    setCodJerarquia(row.cod_jerar)
    setTipoCuenta(row.tipo_cuenta)
    setAnteriorJerarquia(row.ant_jerar)
  }

  const handleClose = () => {
    setOpen(false)
    setCodCuenta('')
    setDescripcion('')
    setCodJerarquia('')
    setTipoCuenta('')
    setAnteriorJerarquia('')
  };

  const changeCodCuenta = (e)=> setCodCuenta(e.target.value)
  const handleChangeDescripcion= (e) => setDescripcion(e.target.value)
  const handleChangeCodJerarquia = (e) => setCodJerarquia(parseInt(e.target.value))
  const handleChangeTipoCuenta = (e) => setTipoCuenta(parseInt(e.target.value))
  const handleChangeAnteriorJerarquia = (e) => setAnteriorJerarquia(e.target.value)
  
  const modificarRegistro=()=>{
    axios.put(`https://localhost:44330/api/PlanContables/?id=${codCuenta}`,{
            "cod_cuenta":codCuenta,
            "des_cuenta":descripcion,
            "cod_jerar":codJerarquia,
            "tipo_cuenta":tipoCuenta,
            "ant_jerar":anteriorJerarquia
    },{headers: {'Content-Type': 'application/json'}})
    .then(res=>console.log(res.data))
    .catch(e=>console.log(e))
    handleClose()
      setTimeout(()=>{
        props.cargarData()
    },1000)
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Numero</TableCell>
            <TableCell>Descripcion</TableCell>
            <TableCell>Jerarquia</TableCell>
            <TableCell>Tipo cuenta</TableCell>
            <TableCell>Anterior Jerarquia</TableCell>
            <TableCell>Editar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((row) => (
            <TableRow key={row.name}>
              <TableCell align="center">{row.cod_cuenta}</TableCell>
              <TableCell>{row.des_cuenta}</TableCell>
              <TableCell>{jerarquia[row.cod_jerar-1]}</TableCell>
              <TableCell>{tipoCuentaText[row.tipo_cuenta-1]}</TableCell>
              <TableCell>{row.ant_jerar}</TableCell>
              <TableCell>
                <IconButton aria-label="delete" color="primary" onClick={()=>{handleOpen(row)}}>
                  <EditIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={open}>
                <div className={classes.paper}>
                    <Typography variant="h5">Nueva cuenta</Typography>
                    <Grid container>
                        <Grid item xs={6} >
                            <Box my={2} mx={1}>
                                <TextField label="Codigo" value={codCuenta} onChange={changeCodCuenta}/>
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box my={2} mx={1}>
                                <TextField label="Descripcion" value={descripcion} onChange={handleChangeDescripcion}/>
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box my={2} mx={1}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="label-select-jerarquia">Jerarquia</InputLabel>
                                    <Select
                                    labelId="label-select-jerarquia"
                                    id="label-select-jerarquia"
                                    value={codJerarquia}
                                    onChange={handleChangeCodJerarquia}
                                    >
                                    <MenuItem value={1}>Troncal</MenuItem>
                                    <MenuItem value={2}>Divisionaria</MenuItem>
                                    <MenuItem value={3}>Especifica</MenuItem>
                                    </Select>
                                    <FormHelperText>Tipo de cuenta contable</FormHelperText>
                                </FormControl>
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box my={2} mx={1}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-label">Tipo Cuenta</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={tipoCuenta}
                                    onChange={handleChangeTipoCuenta}
                                    >
                                        <MenuItem value={1}>Activo</MenuItem>
                                        <MenuItem value={2}>Pasivo</MenuItem>
                                        <MenuItem value={3}>Gastos</MenuItem>
                                        <MenuItem value={4}>Ingresos</MenuItem>
                                    </Select>
                                    <FormHelperText>Tipo de cuenta contable</FormHelperText>
                                </FormControl>
                            </Box> 
                        </Grid>
                        <Grid item xs={6}>
                            <Box my={2} mx={1}>
                                <TextField label="Anterior Jerarquia" 
                                value={anteriorJerarquia} 
                                onChange={handleChangeAnteriorJerarquia}/>  
                            </Box> 
                        </Grid>
                        <Grid item xs={9}>
                            <Box ml={22}>
                            <Button variant="contained" color="primary" onClick={modificarRegistro}>Modificar</Button>
                            </Box>
                        </Grid>
                        <Grid item xs={3}>
                            <Box ml={1}>
                                <Button variant="contained" onClick={handleClose} color="secondary">Cancelar</Button>
                            </Box>
                        </Grid>
                    </Grid>
                </div>
                </Fade>
            </Modal>
    </TableContainer>
  );
}

export default TablaCuentas
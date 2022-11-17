import { Box, Button,Grid,Typography,TextField } from "@material-ui/core";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import {useState} from 'react'
import Fade from '@material-ui/core/Fade';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from "axios";

const useStyles = makeStyles((theme) => ({
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

export default function MiModal(props){
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [codCuenta,setCodCuenta]=useState('');
    const [descripcion,setDescripcion]=useState('');
    const [codJerarquia,setCodJerarquia]=useState('');
    const [tipoCuenta,setTipoCuenta]=useState('');
    const [anteriorJerarquia,setAnteriorJerarquia]=useState('');

    const handleOpen = () => setOpen(true);

    const handleClose = () => {
        setOpen(false)
        setCodCuenta('')
        setDescripcion('')
        setCodJerarquia('')
        setTipoCuenta('')
        setAnteriorJerarquia('')
    };
    
    const guardar = () =>{
        axios.post('https://localhost:44330/api/PlanContables',{
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
    const changeCodCuenta = (e)=> setCodCuenta(e.target.value)
    const handleChangeDescripcion= (e) => setDescripcion(e.target.value)
    const handleChangeCodJerarquia = (e) => setCodJerarquia(parseInt(e.target.value))
    const handleChangeTipoCuenta = (e) => setTipoCuenta(parseInt(e.target.value))
    const handleChangeAnteriorJerarquia = (e) => setAnteriorJerarquia(e.target.value)
    
    return(
        <>
            <Button variant="contained" color="primary" onClick={handleOpen}>Agregar</Button>
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
                            <Box ml={24}>
                            <Button variant="contained" color="primary" onClick={guardar}>Guardar</Button>
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
        </>
    )
}

import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Box, 
    Grid,
    Button, 
    TextField, 
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText, 
    Typography} from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import MaterialTable from 'material-table'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import InputAdornment from '@material-ui/core/InputAdornment';

const useStyles = makeStyles((theme) => ({
    modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        width:200,
        height:150
    },
    formControl: {
        margin: theme.spacing(0),
        minWidth: 180,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

function ViewAsientoContable(){
    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
    };

    const [subdiarioData,setSubdiarioData]=useState([])
    const [referenciaData,setReferenciaData]=useState([])
    const [operacionesData,setOperacionesData]=useState([])

    const [subDiario,setSubDiario] = useState('')
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [operacion,setOperacion] = useState('')
    const [referencia,setReferencia]=useState('')
    const [importe,setImporte]= useState('')

    const [dataTable,setDataTable] = useState([])

    const [openConfirmDialog,setOpenConfirmDialog] = useState(false);

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClickOpenDialog = () => {
        setOpenConfirmDialog(true);
    };

    const handleCloseConfirmDialog = () => {
        setOpenConfirmDialog(false);
    };

    const columnas=[
        {
            title: 'N°',
            field:'row',
            type:"numeric",
        },
        {
            title: 'Nro cuenta',
            field:'nroCuenta',
        },
        {
            title: 'Descripcion',
            field:'descripcion',
        },
        {
            title: 'Debe',
            field:'debe',
        },{
            title: 'Haber',
            field:'haber',
        },
    ]

    const handleChangeSubDiario=(e) => setSubDiario(parseInt(e.target.value))
    const handleDateChange = (date) => setSelectedDate(date)
    const handleChangeOperacion= (e) => setOperacion(parseInt(e.target.value))    
    const handleChangeReferencia = (e) => setReferencia(parseInt(e.target.value))
    const handleImporte=(e)=> setImporte(e.target.value)


    const getSubdiarioData = ()=>{
        axios.get('https://localhost:44330/api/Subdiarios')
        .then(res=>setSubdiarioData(res.data))
        .catch(e=>console.log(e))
    }
    const getReferenciasData=()=>{
        axios.get('https://localhost:44330/api/Referencias')
        .then(res=> setReferenciaData(res.data))
        .catch(e=>console.log(e))
    }
    const getOperacionesData=()=>{
        axios.get('https://localhost:44330/api/Operacions')
        .then(res=> setOperacionesData(res.data))
        .catch(e=>console.log(e))
    }
    const generarAsiento=()=>{
        const igv=importe*0.18
        const precioSinIgv=importe-igv

        if(operacion===2){
            const data=[{
                row:'1',
                nroCuenta:'12.1.01',
                descripcion:'Clientes Arequipa',
                debe:`S/. ${importe}`,
                haber:`-`,
            },{
                row:'2',
                nroCuenta:'40.1.01',
                descripcion:'Tributos Ventas IGV',
                debe:`-`,
                haber:`S/. ${igv}`
            },{
                row:'3',
                nroCuenta:'70.1.01',
                descripcion:'Ventas Mercaderias',
                debe:`-`,
                haber:`S/. ${precioSinIgv}`
            },{
                debe:`S/. ${importe}`,
                haber:`S/. ${importe}`
            }]
            setDataTable(data)
            handleClose()
        }
    }
    const registrarAsiento=()=>{
        axios.post('https://localhost:44330/api/AsientoContables',{
            "num_asiento":0,
            "cod_sub":subDiario,
            "fec_asiento":selectedDate.toLocaleDateString(),
            "tipo_oper":operacion,
            "debe":parseFloat(importe),
            "haber":parseFloat(importe),
            "tipo_ref":referencia
        },{headers: {'Content-Type': 'application/json'}})
        .then(res=>{
            console.log(res.data)
            alert("Asiento registrado con exito")
        })
        .catch(e=>{
            console.log(e.response.data)
            alert("Ocurrio un error al registrar el asiento")
        })

        setImporte('')
        setSubDiario('')
        setSelectedDate(new Date())
        setOperacion('')
        setReferencia('')
        setDataTable([])
        handleCloseConfirmDialog()
    }
    useState(()=>{
        getReferenciasData()
        getSubdiarioData()
        getOperacionesData()
    },[])

    return(
        <Box className="Content" m={2} >
            <Grid container justifyContent="space-between">
                <Grid item xs={12}>
                    <Typography variant="h4">
                        Nuevo asiento
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <Box pt={2}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="label-select-subdiario">Subdiario</InputLabel>
                        <Select
                        labelId="label-select-subdiario"
                        id="label-select-subdiario"
                        value={subDiario}
                        onChange={handleChangeSubDiario}
                        >{subdiarioData.map((row)=>(
                            <MenuItem value={row.cod_sub}>{row.des_sub}</MenuItem>
                        ))}
                        </Select>
                        <FormHelperText>Tipo de subdiario</FormHelperText>
                    </FormControl>
                    </Box>
                </Grid>

                <Grid item xs={4}>
                    <Box>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justifyContent="space-around">
                        <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Fecha"
                        format="MM/dd/yyyy"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        />
                    </Grid>
                    </MuiPickersUtilsProvider>
                    </Box>
                </Grid>
                <Grid item xs={3}>
                <Box pt={2}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="label-select-tipo-operacion">Tipo de operacion</InputLabel>
                        <Select
                        labelId="label-select-tipo-operacion"
                        id="label-select-tipo-operacion"
                        value={operacion}
                        onChange={handleChangeOperacion}
                        >{operacionesData.map((row)=>(
                            <MenuItem value={row.t_oper}>{row.des_oper}</MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box pt={2}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="label-select-tipo-referencia">Tipo de referencia</InputLabel>
                        <Select
                        labelId="label-select-tipo-referencia"
                        id="label-select-tipo-referencia"
                        value={referencia}
                        onChange={handleChangeReferencia}
                        >{referenciaData.map((row)=>(
                            <MenuItem value={row.cod_tipo}>{row.des_tipo}</MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                       <Box pl={20} pt={10} pb={4}>
                       <Button variant="contained" color="primary" onClick={handleOpen}>Agregar importe</Button>
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
                                <Typography variant="h5">Agregar importe</Typography>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <TextField
                                            className={classes.margin}
                                            id="input-with-icon-textfield"
                                            label="Importe"
                                            value={importe}
                                            onChange={handleImporte}
                                            InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                <MonetizationOnIcon />
                                                </InputAdornment>
                                            ),
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Box my={2}>
                                        <Button color="primary" onClick={generarAsiento}>Agregar</Button>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Box my={2}>
                                            <Button onClick={handleClose} color="secondary">Cancelar</Button>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </div>
                            </Fade>
                        </Modal>   
                       </Box> 
                </Grid>
            </Grid>
            <MaterialTable 
                columns={columnas}
                data={dataTable}
                title=""
                options={{
                    search:false,
                    paging:false,
                    tableLayout:"fixed"
                }}
            />
            <Grid container justifyContent="flex-end">
                <Box p={2}>
                {dataTable.length>0?(
                    <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleClickOpenDialog} 
                    >Registrar asiento</Button>):(
                    <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleClickOpenDialog}
                    disabled 
                    >Registrar asiento</Button>
                    )}
                </Box>
            </Grid>
            <Dialog
                fullScreen={fullScreen}
                open={openConfirmDialog}
                onClose={handleCloseConfirmDialog}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">{"Registrar"}</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    ¿Esta seguro que desea registrar este asiento?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={registrarAsiento} color="primary" autoFocus>
                    Aceptar
                </Button>
                <Button autoFocus onClick={handleCloseConfirmDialog} color="secondary">
                    No,cancelar
                </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default ViewAsientoContable
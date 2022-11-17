
import {useState,useEffect} from 'react'
import { Box,Grid,Typography } from "@material-ui/core";
import TablaCuentas from "../Components/TablaCuentas"
import MiModal from "../Components/MiModal"
import axios from 'axios';

function ViewPlanContable(){
    const [data,setData]=useState([])
    const cargarData = ()=>{
        axios.get("https://localhost:44330/api/PlanContables")
        .then(res=>{ 
            setData(res.data)
        })
        .catch(err=>{ console.log(err) })
      }
      
      useEffect(()=>{
        cargarData()
      },[])

    return(
        <Box className="Content" p={2} >
            <Grid container spacing={0}>
                <Grid item xs={10}>
                    <Box className="heigth-10">
                        <Typography variant="h5">Maestro de Cuentas</Typography>  
                    </Box>
                </Grid>
                <Grid item xs={2}>
                    <MiModal cargarData={cargarData} />
                </Grid>
            </Grid>
            <Box m={2}>
                <TablaCuentas data={data} cargarData={cargarData}/>  
            </Box>
                     
        </Box>
    )
}

export default ViewPlanContable
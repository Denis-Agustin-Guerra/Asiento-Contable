import { Box, Typography } from '@material-ui/core'
import escudoUTN from '../img/Escudo_UTN.png'

export default function ViewHomePage(){
    return(
        <Box className="Content">
            <img src={escudoUTN} className="utn-logo" alt='logo'/>
            <Typography variant="h4" className="home-text">Bienvenido al sistema de contabilidad</Typography>
        </Box>
    )
}
import SideBar from "./SideBar"
import Main from "./Main"
import { Grid } from "@material-ui/core"
import { BrowserRouter as Router } from "react-router-dom"

function Content(){
    return(
        <Router>
        <Grid container spacing={0}>
            <Grid item xs={2}>
                <SideBar />
            </Grid>
            <Grid item xs={10}>
                <Main /> 
            </Grid>
        </Grid>
        </Router>
    )
}
export default Content
import { Route, Switch } from "react-router-dom";
import ViewAsientoContable from "../Views/ViewAsientoContable";
import ViewPlanContable from "../Views/ViewPlanContable";
import ViewHomePage from "../Views/ViewHomePage";

function Main(){

    return(
        <Switch>
            <Route path="/asiento" exact>
                <ViewAsientoContable />
            </Route>
            <Route path="/maestroCuentas" exact>
                <ViewPlanContable />
            </Route>
            <Route path="/">
                <ViewHomePage />     
            </Route>
        </Switch>
    )
}

export default Main
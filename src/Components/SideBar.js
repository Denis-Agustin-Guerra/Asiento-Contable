
import { Box } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import BookIcon from '@material-ui/icons/Book';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from 'react-router-dom'

function SideBar(){
    return(
            <Box className="SideBar"> 
                <List component="nav" aria-label="main mailbox folders">
                <ListItem button>
                        <Link to="/" className="link">
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText>Inicio</ListItemText> 
                            </Link>
                    </ListItem>

                    <ListItem button>
                        <Link to="/maestroCuentas" className="link">
                            <ListItemIcon>
                                <BookIcon />
                            </ListItemIcon>
                            <ListItemText>Plan contable</ListItemText>
                       </Link>
                    </ListItem>

                    <ListItem button>
                        <Link to="/asiento" className="link">
                            <ListItemIcon>
                                <AccountBalanceIcon />
                            </ListItemIcon>
                            <ListItemText>Asientos</ListItemText> 
                            </Link>
                    </ListItem>
                </List>
            </Box>
    )
}
export default SideBar
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Grid } from "@mui/material";
import UserMenu from "./UserMenu";
import { Link } from "react-router-dom";


const MainNav = ()=>{
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    return(
        <>
            <span className="flex space-x-2 items-center">
                {isAuthenticated ?
                (
                    <>
                        <Grid container gap={3} alignItems={"center"} justifyContent={"space-between"} >
                            <Link to="/booking-status" >
                                <Button >Booking Status</Button>
                            </Link>
                            <UserMenu/>
                        </Grid>
                        
                    </>
                ):
                <Button 
                    className="font-bold" 
                    variant="contained" 
                    onClick={async ()=> await loginWithRedirect() }>
                    Log In 
                </Button>
                }
            </span>
        </>
        
    )
}
export default MainNav;
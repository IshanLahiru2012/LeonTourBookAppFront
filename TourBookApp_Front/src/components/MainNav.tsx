import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";
import UserMenu from "./UserMenu";


const MainNav = ()=>{
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    return(
        <>
            <span className="flex space-x-2 items-center">
                {isAuthenticated ? <UserMenu/>:
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
import { Button, Divider, IconButton,Paper, Popover, Typography, useMediaQuery } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import {useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import CloseIcon from '@mui/icons-material/Close';
import UserMenu from "./UserMenu";

const MobileNav = ()=>{
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    useEffect(() => {
        const handleResize = () => {
          setAnchorEl(null);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize); // Cleanup function
    }, []);

    const {isAuthenticated, loginWithRedirect, user} = useAuth0();

    return(
        <>
        <span className="flex space-x-2 items-center">
                {isAuthenticated ? <UserMenu/> :
                <IconButton onClick={handleClick}>
                    <MenuIcon className="hover:text-emerald-500"/>
                </IconButton>}
            </span>
            {anchorEl &&
            <Popover 
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                <Paper elevation={3} style={{ padding: 20 }} className="w-99 h-screen" >
                    <div style={{ marginTop: 20 }}>
                        <div className="text-emerald-500 flex flex-col justify-between  items-center gap-5">
                            <div className="flex gap-10">
                                <Typography variant="h5" className="border-b-4 pb-5 ">Welcome To Leon Tour Booking App</Typography>
                                <IconButton onClick={handleClose}>
                                    <CloseIcon className="text-red-500"/>
                                </IconButton>
                                
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }} className="py-2">
                                <Button variant="contained" color="primary" onClick={async ()=> await loginWithRedirect() }>
                                    Log in
                                </Button>
                            </div>
                        </div>
                    </div>
                </Paper>
            </Popover>}            
        </>

    
    )
}
export default MobileNav;
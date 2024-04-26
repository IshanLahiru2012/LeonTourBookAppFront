import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { User, useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

export default function FadeMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const {user,logout} = useAuth0();
  const handleLogout = ()=>{
    logout();
    handleClose();
  }
  const navigate = useNavigate();
  const handleProfile = ()=>{
    navigate("/user-profile");
    handleClose();
  }

  const handleAccount = ()=> {
    navigate("/manage-transfer");
    handleClose();
  }

  return (
    <div>
      <button
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}  
        className='bg-slate-300 font-bold w-8 h-8 rounded-2xl hover:bg-slate-200 active:bg-slate-600 duration-300'   
      >
        {(user?.email)?.substring(0,1).toUpperCase()}
      </button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleProfile}>Profile</MenuItem>
        <MenuItem onClick={handleAccount}>Transfer Account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
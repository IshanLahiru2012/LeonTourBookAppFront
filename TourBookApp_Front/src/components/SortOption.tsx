import { Button, Fade, Menu, MenuItem } from "@mui/material";
import { green, yellow } from "@mui/material/colors";
import React from "react";

type Props = {
    onChange: (value: string) => void;
    sortOption: string;
};

const SORT_OPTIONS = [
    {label: "Best match", value: "bestMatch"},
    {label: "Estimated prepare time", value: "estimatedArrivalTime"},
    {label: "Last updated", value: "lastUpdated"},
    

];

const SortOption = ({onChange,sortOption}:Props)=>{

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const selectedOption = SORT_OPTIONS.find((option)=> option.value === sortOption)?.label ||SORT_OPTIONS[0].label;
 
    return(
        <>
            <Button
                id="fade-button"
                aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}  
                sx={{backgroundColor: green[50], textTransform: 'none'}}
                className='text-sm font-bold rounded-2xl hover:bg-slate-200 active:bg-slate-600 duration-300'   
            >
                {`Sort By: ${selectedOption}`}
            </Button>
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
                {SORT_OPTIONS.map((option)=>(
                    <MenuItem onClick={()=> {handleClose(); onChange(option.value)}} key={option.label}>
                        {option.label}
                    </MenuItem>
                ))}
                
        </Menu>

        </>
    )

}

export default SortOption;
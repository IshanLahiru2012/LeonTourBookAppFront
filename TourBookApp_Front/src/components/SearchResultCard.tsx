import { ButtonBase, Grid, Link, Paper, Theme, Typography, styled, useMediaQuery } from "@mui/material";
import { Transfer } from "../type";
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import { AspectRatio } from "@mui/joy";
import AccessTimeIcon from "@mui/icons-material/AccessTime"

type Props= {
    transfer : Transfer
}


const SearchResultCard = ({transfer}:Props) =>{
  const navigate = useNavigate();
  const handleDetail =()=>{
    navigate(`/detail/${transfer._id}`);
  }
    
    return (
        <Paper
          sx={{
            p: 2,
            margin: 'auto',
            marginBottom:1,
            flexGrow: 1,
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={5} md={4} lg={4} xl={3} container alignItems={"center"} >
                <Grid item xs={12} >
                <AspectRatio ratio={16/6}>
                    <img
                        alt="Transfer Image"
                        src={transfer.transferImageUrl}
                        className="rounded-md w-full  object-cover hover:cursor-pointer "   
                        onClick={handleDetail}                     
                    />
                </AspectRatio>
                </Grid>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1" component="div" onClick={handleDetail} >
                    {transfer.transferName}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {transfer.city}
                  </Typography>
                  <Typography variant="body2" gutterBottom >
                    <span>Category: • </span>
                    {transfer.vehicleTypes.map((type,index)=>(
                        <span key={index}>
                            <span >{type.vehicleCategory}</span>
                            {index < transfer.vehicleTypes.length-1 && <span> &nbsp; • </span>}
                        </span>
                     ))}
                    
                  </Typography>
                </Grid>
                
              </Grid>
              <Grid item xs={12} sm>
                <Typography variant="subtitle1" component="div">
                    <AccessTimeIcon/>
                    ready in {transfer.estimatedArrivalTime} mins
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      );
}

export default SearchResultCard;
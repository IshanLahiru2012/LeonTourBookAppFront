import { ButtonBase, Grid, Link, Paper, Theme, Typography, styled, useMediaQuery } from "@mui/material";
import { Transfer } from "../type";
import {Link as RouterLink} from 'react-router-dom';
import { AspectRatio } from "@mui/joy";
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import { yellow } from "@mui/material/colors";

type Props= {
    transfer : Transfer
}

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });

const SearchResultCard = ({transfer}:Props) =>{
    
    return (
        <Paper
          sx={{
            p: 2,
            margin: 'auto',
            // maxWidth: 500,
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
                        className="rounded-md w-full  object-cover "                        
                    />
                </AspectRatio>
                </Grid>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1" component="div">
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

    // return(
    //     <>
    //         <Link
    //             component={RouterLink}
    //             to={`/detail${transfer._id}`}
    //         >
    //             <Grid container>
    //                 <Grid item xs={12} lg={6}>
    //                     <AspectRatio ratio={16/6}>
    //                         <img
    //                             src={transfer.transferImageUrl}
    //                             className="rounded-md w-full h-full object-cover"
    //                         >
    //                         </img>
    //                     </AspectRatio>
    //                 </Grid>
    //                 <Grid item xs={12} lg={6}>
    //                     <Grid container >
    //                         <Grid item xs={12} lg={6} sx={{backgroundColor:yellow[200]}} >
    //                             <h3>{transfer.transferName}</h3>
    //                             {transfer.vehicleTypes.map((vehicle,index)=>(
    //                                 <span>
    //                                     <span>{vehicle.vehicleCategory}</span>
    //                                     {index < transfer.vehicleTypes[0].color.length-1 && <span>*</span>}
    //                                 </span>
    //                             ))}

    //                         </Grid>
    //                         <Grid item xs={12} lg={6}>
    //                             <AccessTimeIcon/>
    //                             {transfer.estimatedArrivalTime} mins
    //                         </Grid>
    //                     </Grid>
    //                 </Grid>
    //             </Grid>
    //         </Link>
    //     </>

    // );
}

export default SearchResultCard;
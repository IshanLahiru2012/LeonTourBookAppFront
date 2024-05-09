import { Grid, Link, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import {Link as RouterLink} from 'react-router-dom'
import SearchResultCard from "./SearchResultCard";

type Props = {
    total: number;
    city: string;
}

const SearchResultDetail = ({total, city}:Props) =>{
    return(
        <Grid container >
            <Grid item lg={12} xs={12} container justifyContent={"center"}>
                <Typography >
                    <span>{total} Transfers found in {city} </span>
                    <Link fontSize={14} underline="hover" component={RouterLink} to={"/"} >Change Location</Link>
                    
                </Typography>

            </Grid>
        </Grid>

    )
}

export default SearchResultDetail
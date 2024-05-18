import { AspectRatio } from "@mui/joy";
import { Button, Checkbox, Grid, Paper, Typography } from "@mui/material";
import { Transfer } from "../type";
import { green } from "@mui/material/colors";

type Props = {
  transfer: Transfer;
  selectedIndex : number;
  handleSelectIndex: (index:number)=> void;
};

const VehicleCard = ({ transfer,selectedIndex,handleSelectIndex }: Props) => {

  const handleSelectCheckChange = (index: number) => {
    handleSelectIndex(index);
  };

  return (
    <>
      <Paper sx={{ p: 1, margin: 1, backgroundColor:green[200],color:"white", mt: 2, display: "flex", justifyContent: "center" }}>
        <Typography>Vehicle Types</Typography>
      </Paper>

      {transfer.vehicleTypes.map((type, index) => (
        <Paper
          key={index}
          sx={{ p: 2, m:1, cursor:"pointer",
            backgroundColor: (theme) => (theme.palette.mode === "dark" ? "#1A2027" : "#fff"),
          }}
          onClick={()=> handleSelectCheckChange(index)}
        >
          <Grid container columnSpacing={2}>            
            <Grid item xs={12} sm={5} md={4} lg={4} xl={3} container alignItems={"center"}>
              <Grid item xs={12}>
                <AspectRatio ratio={2 / 1}>
                  <img
                    alt="Vehicle Image"
                    src={type.vehicleImageUrl}
                    className="rounded-md w-full object-cover hover:cursor-pointer"
                  />
                </AspectRatio>
              </Grid>
            </Grid>
            
            <Grid item xs={10} md={7} container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1" color={"green"} sx={{'&:hover': {textDecoration: 'underline' }}} >
                    {type.vehicleCategory}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Price per Km:</strong> Rs. {type.pricePerKm}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Colors:</strong>
                    {type.color.map((color, num) => (
                      <span key={num}>&nbsp; • {color}</span>
                    ))}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Number of Seats:</strong> {type.numOfSeats}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Manufactured Year:</strong> {type.manufacYear}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            
            <Grid item xs={2} md={1}>
              <Checkbox
                checked={selectedIndex === index} // Only one checkbox can be selected
                onChange={() => handleSelectCheckChange(index)}
              />
            </Grid>
          </Grid>
        </Paper>
      ))}
    </>
  );
};

export default VehicleCard;

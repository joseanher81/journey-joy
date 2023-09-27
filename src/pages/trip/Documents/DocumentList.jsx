import { Grid, Paper, Typography } from "@mui/material";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import FlightTakeoffOutlinedIcon from '@mui/icons-material/FlightTakeoffOutlined';
import SubwayOutlinedIcon from '@mui/icons-material/SubwayOutlined';
import DriveEtaOutlinedIcon from '@mui/icons-material/DriveEtaOutlined';
import LocalActivityOutlinedIcon from '@mui/icons-material/LocalActivityOutlined';
import { useTheme } from "@emotion/react";
import { tokens } from "../../../theme";


export default function DocumentList({handleOpenModal, trip}) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Grid container spacing={2} sx={{margin: '0 50px 40px', minHeight: '200px'}}>
            {trip.documents.map( card => (
                <Grid item xs={1}>
                <a
                    href={card.fileURL}
                    target="_blank" 
                    rel="noopener noreferrer" // For security purpouses
                    style={{ textDecoration: 'none', color: 'inherit', width: '100%', height: '100%', cursor: 'pointer' }}
                >
                        <Paper elevation={3} sx={{
                            width: '90%', // Ancho de la tarjeta
                            height: '100%', // Alto de la tarjeta
                            backgroundColor: colors.greenAccent[900], // Color de fondo de la tarjeta
                            borderRadius: 5,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            //border: '1px solid #ccc'
                        }}>
                            { card.type === 'flight' && <FlightTakeoffOutlinedIcon sx={{ width: '80%', height: '80%', opacity: '50%' }}/>}
                            { card.type === 'train' && <SubwayOutlinedIcon sx={{ width: '80%', height: '80%', opacity: '50%' }}/>}
                            { card.type === 'car' && <DriveEtaOutlinedIcon sx={{ width: '80%', height: '80%', opacity: '50%' }}/>}
                            { card.type === 'ticket' && <LocalActivityOutlinedIcon sx={{ width: '80%', height: '80%', opacity: '50%' }}/>}
                            <Typography variant="h6" textAlign='center' lineHeight="1em">{card.text}</Typography>
                        </Paper>
                    </a>
                </Grid>
            ))}    

            <Grid item xs={1}>
                    <Paper 
                        onClick={handleOpenModal}
                        elevation={3} 
                        sx={{
                        width: '90%', // Ancho de la tarjeta
                        height: '100%', // Alto de la tarjeta
                        backgroundColor: colors.grey[900], // Color de fondo de la tarjeta
                        borderRadius: 5,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        //border: '1px solid #ccc'
                    }}>
                        <AddCircleOutlineOutlinedIcon sx={{ width: '80%', height: '80%', opacity: '50%' }}/>
                    </Paper>
            </Grid> 
        </Grid>
    )
}

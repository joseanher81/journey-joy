import { useTheme } from '@emotion/react';
import { Box, Button, FormControl, FormControlLabel, FormLabel, Grid, Modal, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { tokens } from '../../../theme';
import { useEffect, useState } from 'react';
import { DesktopTimePicker } from '@mui/x-date-pickers';


const activityTypes = [
    {value: 'leisure', text: 'Ocio'},
    {value: 'catering', text: 'Restauración'},
    {value: 'travel', text: 'Viaje / Desplazamiento'},
    {value: 'other', text: 'Otro'}
];

export default function ActivityModal({openModal, handleCloseModal, handleAddActivity}) {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [activityDescription, setActivityDescription] = useState('');
    const [start, setStart] = useState(null);
    const [activityType, setActivityType] = useState('leisure');

    // Activity type radio button handle
    const handleChangeType = (e) => {
        setActivityType(e.target.value);
    }

    const handleActivityDescription = (e) => {
        setActivityDescription(e.target.value);
    }

    useEffect(() => {
        setStart(null);
    },[openModal]);

    
    return (
        <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-new-activity"
            aria-describedby="modal-create-new-activity"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                border: `4px solid ${colors.greenAccent[700]}`,
                borderRadius: '5px',
                boxShadow: 14,
                p: 4,
            }}>
                <Typography id="modal-modal-title" variant="h6" component="h2" color={colors.greenAccent[400]}>
                    Añadir Nueva Actividad
                </Typography>
            
                {/* Form */}
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="activity"
                    name="activity"
                    label="Descripción"
                    multiline
                    rows={4}
                    onChange={handleActivityDescription}
                    sx={{
                        '& label.Mui-focused': {
                            color: colors.greenAccent[400] ,
                        },
                        '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                                borderColor: colors.greenAccent[400],
                            },
                        },
                    }}
                />

                <FormControl sx={{marginTop: '10px'}}>
                    <FormLabel id="document-type-radio-buttons-group">Tipo de actividad</FormLabel>
                    <RadioGroup
                        
                        aria-labelledby="document-type-radio-buttons-group"
                        name="documentType"
                        value={activityType}
                        onChange={handleChangeType}
                    >
                    {activityTypes.map ( activity => (
                        <FormControlLabel
                            key={activity.value} 
                            value={activity.value} 
                            control={<Radio />} 
                            label={activity.text}                                         
                        />
                    ))}
                    </RadioGroup>
                </FormControl>

                <DesktopTimePicker
                    margin="normal"
                    id="startTime"
                    name="startTime"
                    label="Hora de comienzo"
                    value={start}
                    onChange={(newValue) => setStart(newValue)}
                    ampm={false}
                    sx={{
                        'width': '100%',
                        'marginTop': '10px',
                        '& label.Mui-focused': {
                            color: colors.greenAccent[400] ,
                        },
                        '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                                borderColor: colors.greenAccent[400],
                            },
                        },
                    }}
                />             

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    startIcon={<AddCircleIcon />}
                    sx={{ mt: 3, mb: 2, backgroundColor: colors.greenAccent[400] }}
                    onClick={() => handleAddActivity(activityDescription, start, activityType)}
                >
                    Guardar
                </Button>

            </Box>
        </Modal>
    )
    }

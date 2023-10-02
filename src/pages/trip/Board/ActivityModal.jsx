import { useTheme } from '@emotion/react';
import { Box, Button, Modal, TextField, Typography } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { tokens } from '../../../theme';
import { useState } from 'react';

export default function ActivityModal({openModal, handleCloseModal, handleAddActivity}) {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [activityDescription, setActivityDescription] = useState('');

    const handleActivityDescription = (e) => {
        setActivityDescription(e.target.value);
    }

    
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

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    startIcon={<AddCircleIcon />}
                    sx={{ mt: 3, mb: 2, backgroundColor: colors.greenAccent[400] }}
                    onClick={() => handleAddActivity(activityDescription)}
                >
                    Guardar
                </Button>

            </Box>
        </Modal>
    )
    }

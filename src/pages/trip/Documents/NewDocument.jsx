import { useTheme } from "@emotion/react";
import { Box, Button, FormControl, FormControlLabel, FormLabel, Grid, Modal, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import FlightTakeoffOutlinedIcon from '@mui/icons-material/FlightTakeoffOutlined';
import SubwayOutlinedIcon from '@mui/icons-material/SubwayOutlined';
import DriveEtaOutlinedIcon from '@mui/icons-material/DriveEtaOutlined';
import LocalActivityOutlinedIcon from '@mui/icons-material/LocalActivityOutlined';
import { tokens } from "../../../theme";
import { useState } from "react";


const documentTypes = [
    {value: 'flight', text: 'Boarding pass', icon: <FlightTakeoffOutlinedIcon sx={{ marginLeft: '20px'}} fontSize="large"/>},
    {value: 'train', text: 'Train ticket', icon: <SubwayOutlinedIcon sx={{ marginLeft: '20px'}} fontSize="large"/>},
    {value: 'car', text: 'Car rental', icon: <DriveEtaOutlinedIcon sx={{ marginLeft: '20px'}} fontSize="large"/>},
    {value: 'ticket', text: 'Event ticket', icon: <LocalActivityOutlinedIcon sx={{ marginLeft: '20px'}} fontSize="large"/>},
];

export default function NewDocument({openModal, handleCloseModal, handleAddDocuments}) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [documentType, setDocumentType] = useState('flight');
    const [documentDescription, setDocumentDescription] = useState('');
    const [file, setFile] = useState(null);
    const [fileError, setFileError] = useState(null);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: `4px solid ${colors.greenAccent[700]}`,
        borderRadius: '5px',
        boxShadow: 24,
        p: 4,
    };

    const resetForm = () => {
        setFile(null);
        setDocumentDescription('');
        setFileError(null);
        setDocumentType('flight');
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        await handleAddDocuments(file, documentType, documentDescription);

        resetForm();
        handleCloseModal();
    }

    // Document type radio button handle
    const handleChangeType = (e) => {
        setDocumentType(e.target.value);
    }

     // File input handle
     const handleFileChange  = (e) => {
        setFile(null); // First reset any previous file
        setFileError(null); // Reset any previous error
  
        let selected = e.target.files[0];
  
        // File validations
        if(!selected) {
            setFileError('Please select a file');
          return;
        }

        if(selected.size > 3000000) {
            setFileError('Document file size must be less than 3Mb');
          return;
        }
  
        setFile(selected);
        console.log('File selected');
      }

    return (
        <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Grid item xs={12}>
                    <Typography variant="h4">Add New Document</Typography>
                </Grid>
                <Grid item xs={12} sx={{marginTop: '20px'}}>
                    {/* NEW COMMENT FORM*/}
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>

                        <FormControl>
                            <FormLabel id="document-type-radio-buttons-group">Type of document</FormLabel>
                            <RadioGroup
                                
                                aria-labelledby="document-type-radio-buttons-group"
                                name="documentType"
                                value={documentType}
                                onChange={handleChangeType}
                            >
                            {documentTypes.map ( doc => (
                                <FormControlLabel 
                                    value={doc.value} 
                                    control={<Radio />} 
                                    label={
                                        <Box display="flex" alignItems="center">
                                            <Typography variant="body1">{doc.text}</Typography>
                                            {doc.icon}                                          
                                        </Box>
                                    }                                         
                                />
                            ))}
                            </RadioGroup>
                        </FormControl>


                        <TextField
                            onChange={(e) => setDocumentDescription(e.target.value)}
                            value={documentDescription}
                            margin="normal"
                            required
                            fullWidth
                            id="description"
                            name="description"
                            label="Description"
                            sx={{
                                marginTop: '20px',
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

                        <TextField
                            type="file"
                            margin="normal"
                            required
                            fullWidth
                            name="documentFile"
                            id="documentFile"
                            label="Document file"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                accept: '.jpeg, .jpg, .png, .doc, .docx, .pdf', 
                                onChange: handleFileChange, 
                            }}
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

                        {true && (
                            <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, backgroundColor: colors.greenAccent[400] }}
                            >
                            Add Document
                            </Button>
                        )}
                        {!true && (
                            <Button
                            disabled
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, backgroundColor: colors.greenAccent[400] }}
                            >
                            Loading
                            </Button>
                        )}
                    </Box>
                </Grid>
                </Box>
        </Modal>      
    )
}

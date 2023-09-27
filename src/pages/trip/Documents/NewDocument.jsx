import { useTheme } from "@emotion/react";
import { Box, Button, FormControl, FormControlLabel, FormLabel, Grid, Modal, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import FlightTakeoffOutlinedIcon from '@mui/icons-material/FlightTakeoffOutlined';
import SubwayOutlinedIcon from '@mui/icons-material/SubwayOutlined';
import DriveEtaOutlinedIcon from '@mui/icons-material/DriveEtaOutlined';
import LocalActivityOutlinedIcon from '@mui/icons-material/LocalActivityOutlined';
import FileDownloadDoneOutlinedIcon from '@mui/icons-material/FileDownloadDoneOutlined';
import { FileUploader } from "react-drag-drop-files";
import { tokens } from "../../../theme";
import { useState } from "react";


const documentTypes = [
    {value: 'flight', text: 'Boarding pass', icon: <FlightTakeoffOutlinedIcon sx={{ marginLeft: '20px'}} fontSize="large"/>},
    {value: 'train', text: 'Train ticket', icon: <SubwayOutlinedIcon sx={{ marginLeft: '20px'}} fontSize="large"/>},
    {value: 'car', text: 'Car rental', icon: <DriveEtaOutlinedIcon sx={{ marginLeft: '20px'}} fontSize="large"/>},
    {value: 'ticket', text: 'Event ticket', icon: <LocalActivityOutlinedIcon sx={{ marginLeft: '20px'}} fontSize="large"/>},
];

const documentFileTypes = ["JPG", "JPEG", "PNG", "DOC", "DOCX", "PDF"];

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
        boxShadow: 14,
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
     const handleFileChange  = (file) => {
        setFile(null); // First reset any previous file
        setFileError(null); // Reset any previous error
        console.log(file)
  
        let selected = file;
  
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
            aria-labelledby="modal-new-document"
            aria-describedby="modal-create-new-document"
        >
            <Box sx={style}>
                <Grid item xs={12}>
                    <Typography variant="h4" color={colors.greenAccent[400]}>Add New Document</Typography>
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
                                        <Box display="flex" alignItems="center" color={colors.grey[500]}>
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

                        <FileUploader
                            required
                            handleChange={handleFileChange}
                            types={documentFileTypes}
                            hoverTitle=" "
                            dropMessageStyle={{ border: "none" }}
                        >
                            <Box
                                sx={{
                                    width: "100%",
                                    height: "150px",
                                    cursor: "pointer",
                                    marginTop: "20px",
                                    border: `2px dashed ${colors.greenAccent[400]}`, 
                                    borderRadius: '10px',
                                    
                                }}
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                backgroundColor={colors.primary}
                                textAlign="center"
                            >
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    flexDirection="column"
                                    padding="20px"
                                >
                                    {!file && (
                                        <>
                                            <PostAddOutlinedIcon sx={{fontSize: '8vh', color: colors.grey[500]}}/>
                                            <Typography variant="h5" color={colors.grey[500]}>Upload or drop a document here</Typography>
                                        </>
                                    )}
                                    {file && (
                                        <>
                                            <FileDownloadDoneOutlinedIcon sx={{fontSize: '8vh', color: colors.grey[500]}}/>
                                            <Typography variant="h5" color={colors.grey[500]}>{file.name}</Typography>
                                        </>
                                    )}
                                </Box>
                                
                            </Box>
                        </FileUploader> 

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

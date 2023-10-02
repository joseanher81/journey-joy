import { useTheme } from "@emotion/react";
import { Avatar, Box, Card, CardContent, Grid, IconButton, Paper, Typography } from "@mui/material";

import { tokens } from "../../../theme";
import { useState } from "react";
import NewDocument from "./NewDocument";
import { useStore } from "../../../hooks/useStore";
import { useFirestore } from "../../../hooks/useFirestore";
import DocumentList from "./DocumentList";
import {useSnackBarContext} from '../../../hooks/useSnackBarContext';

export default function Documents({trip}) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const {error, isPending, uploadFile} = useStore();
    const {updateDocument, response} = useFirestore('trips');
    const {showSnack} = useSnackBarContext();

    // Create new document modal behaviour
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    // Adding documents to Firestore
    const handleAddDocuments = async(file, documentType, documentDescription) => {
        console.log('Documento nuevo', file, documentType, documentDescription)

        const fileURL = await uploadFile(trip.id, file);

        const newDocument = {
            fileURL,
            type: documentType,
            text: documentDescription
        }

        await updateDocument( trip.id, {
            documents: [...trip.documents, newDocument]
        })

        // Show success snackbar
        if(!response.error) showSnack('New document added!');

    }   
   
    return (
        <>
            <Box>
                <Typography variant="h2" sx={{marginLeft: '50px'}}>Documentos de Viaje</Typography>

                {/* Documents row*/}
                <DocumentList handleOpenModal={handleOpenModal} trip={trip}/>
                
            </Box>

            {/* New document Modal */}
            <NewDocument handleCloseModal={handleCloseModal} openModal={openModal} handleAddDocuments={handleAddDocuments}/>
        </>
  )
}


import { useTheme } from "@emotion/react";
import { Avatar, Box, Card, CardContent, Grid, IconButton, Paper, Typography } from "@mui/material";

import { tokens } from "../../../theme";
import { useState } from "react";
import NewDocument from "./NewDocument";
import { useStore } from "../../../hooks/useStore";
import { useFirestore } from "../../../hooks/useFirestore";
import DocumentList from "./DocumentList";

const cards = [
    {type: 'flight', text: 'Avión Laura'},
    {type: 'train', text: 'Tren a Munich'},
    {type: 'car', text: 'Alquiler Berlín'},
    {type: 'ticket', text: 'Museo de arte'},
];

export default function Documents({trip}) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const {error, isPending, uploadFile} = useStore();
    const {updateDocument, response} = useFirestore('trips');

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

    }   
   
    return (
        <>
            <Box>
                <Typography variant="h2" sx={{marginLeft: '50px'}}>Trip documents</Typography>

                {/* Documents row*/}
                <DocumentList handleOpenModal={handleOpenModal} trip={trip}/>
                
            </Box>

            {/* New document Modal */}
            <NewDocument handleCloseModal={handleCloseModal} openModal={openModal} handleAddDocuments={handleAddDocuments}/>
        </>
  )
}


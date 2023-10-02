import { useTheme } from "@emotion/react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { tokens } from "../../../theme";
import { useState } from "react";


export default function NewComment({handleAddNewComment}) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [newComment, setNewComment] = useState('');

    const isPending = false;

    const handleSubmit = (e) => {
        e.preventDefault();

        if(newComment.length > 0) {
            handleAddNewComment(newComment);
            setNewComment('')
        }   
    }

    return (
        <>
        <Grid item xs={12}>
            <Typography variant="h4">Añadir Nuevo Comentario</Typography>
        </Grid>
        <Grid item xs={12}>
            {/* NEW COMMENT FORM*/}
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                    onChange={(e) => setNewComment(e.target.value)}
                    value={newComment}
                    margin="normal"
                    required
                    fullWidth
                    id="comment"
                    name="comment"
                    label="Comentario"
                    multiline
                    rows={4}
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
                {!isPending && (
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, backgroundColor: colors.greenAccent[400] }}
                    >
                    Añadir Comentario
                    </Button>
                )}
                {isPending && (
                    <Button
                    disabled
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, backgroundColor: colors.greenAccent[400] }}
                    >
                    Cargando
                    </Button>
                )}
            </Box>
        </Grid>
        </>
    )
}

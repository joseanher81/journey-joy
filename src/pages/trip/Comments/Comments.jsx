import { Grid, Typography } from "@mui/material";
import NewComment from "./NewComment";
import CommentsList from "./CommentsList";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useFirestore } from "../../../hooks/useFirestore";
import { timestamp } from "../../../firebase/config";
import {useSnackBarContext} from '../../../hooks/useSnackBarContext';


export default function Comments({trip}) {
    const {user} = useAuthContext();
    const { updateDocument, response } = useFirestore('trips');
    const {showSnack} = useSnackBarContext();

    const handleAddNewComment =  async(content) => {
        const newComment = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            content,
            createdAt: timestamp.fromDate(new Date()),
            id: Math.random() // Eventually add id library
        }

        await updateDocument(trip.id, {
            comments: [...trip.comments, newComment]
        });

        // Show success snackbar
        if(!response.error) showSnack('New comment added!');
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h2">Trip Comments</Typography>
                <CommentsList comments={trip.comments}/>
            </Grid>
            <Grid item xs={12}>
                <NewComment handleAddNewComment={handleAddNewComment}/>
            </Grid>
            
        </Grid>
  )
}

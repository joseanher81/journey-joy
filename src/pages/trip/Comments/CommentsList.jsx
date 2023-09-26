import { useTheme } from "@emotion/react";
import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material";
import { tokens } from "../../../theme";
import { formatDistanceToNow } from "date-fns";


export default function CommentsList({comments}) {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <>
      {comments?.length > 0 && comments.map( comment => (
        <Card 
          key={comment.id}
          sx={{ 
            backgroundColor: colors.greenAccent[900],
            padding: '0 15px',
            marginTop: '10px',
            marginBottom: '5px',
            minHeight: '80px',
            borderRadius: '5px',
            maxWidth: '311px'
        }}>
          <CardContent>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={2} >
                <Avatar src={comment.photoURL} alt={comment.displayName} />
              </Grid>
              <Grid item xs={10}>
                <Typography variant="h4" sx={{marginLeft: '10px'}}>
                  {comment.displayName}
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{paddingTop: '5px !important'}}>
                <Typography variant="subtitle2">
                  {formatDistanceToNow(comment.createdAt.toDate(), { addSuffix: true })}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">
                  {comment.content}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))
      }
    </>
  )
}

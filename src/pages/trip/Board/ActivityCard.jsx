import React, { useEffect, useState } from 'react';
import { Draggable } from '@hello-pangea/dnd';
import styled from '@emotion/styled';
import { Card, CardContent, Grid, TextField, Typography } from '@mui/material';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useTheme } from '@emotion/react';
import { tokens } from '../../../theme';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import { timestamp } from '../../../firebase/config'
import { format } from "date-fns";



const ActivityCard = ({ item, index, deleteActivityById, editActivityById, day }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(item.activity);

  const handleTextClick = () => {
    setIsEditing(true);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleTextBlur = (day, id) => {
    setIsEditing(false);
    editActivityById(day, id, text)
  };

  // useEffect(() => {
  //   setText(item.activity);
  // }, [item])

  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >

          <Card 
            onClick={()=> console.log('clicking')}
            sx={{ 
              padding: '0 15px',
              marginTop: '10px',
              marginBottom: '5px',
              minHeight: '80px',
              borderRadius: '5px',
              maxWidth: '311px'
          }}>

          

            <CardContent sx={{paddingBottom: "10px !important"}} >
              <Grid container spacing={2} >
                <Grid item xs={11}>

                {isEditing ? (
                  <TextField
                    value={text}
                    onChange={handleTextChange}
                    onBlur={()=>handleTextBlur(day, item.id)}
                    autoFocus
                    fullWidth
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
                ) : (
                  <Typography variant="body2" onClick={handleTextClick}>
                    {item.activity}
                  </Typography>
                )}


                </Grid>
                <Grid item xs={1}>
                  <DeleteForeverOutlinedIcon fontSize='1.7rem' sx={{'color': colors.greenAccent[400]}} onClick={()=>deleteActivityById(day, item.id)}/>
                </Grid>
              </Grid>

              { item.start  && 
                (<Grid container spacing={2}>
                  <Grid item xs={12} sx={{'display': 'flex', 'alignItems': 'center'}}>
                    <AccessTimeOutlinedIcon sx={{'fontSize': '1rem', 'marginRight': '5px', 'color': colors.greenAccent[400]}} />
                    <Typography variant="caption" color={colors.greenAccent[400]}>
                      {format(item.start.toDate(), "HH:mm")}
                    </Typography>
                  </Grid>
                </Grid>)
              }
            </CardContent>
{/*             <CardContent sx={{paddingBottom: "10px !important"}} >
              <Grid container spacing={2} >
                <Grid item xs={11}>
                  <Typography variant="body2">
                    {item.activity}
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  <DeleteForeverOutlinedIcon fontSize='1.7rem' sx={{'color': colors.greenAccent[400]}} onClick={()=>deleteActivityById(day, item.id)}/>
                </Grid>
              </Grid>

              { item.start  && 
                (<Grid container spacing={2}>
                  <Grid item xs={12} sx={{'display': 'flex', 'alignItems': 'center'}}>
                    <AccessTimeOutlinedIcon sx={{'fontSize': '1rem', 'marginRight': '5px', 'color': colors.greenAccent[400]}} />
                    <Typography variant="caption" color={colors.greenAccent[400]}>
                      {format(item.start.toDate(), "HH:mm")}
                    </Typography>
                  </Grid>
                </Grid>)
              }
            </CardContent> */}
          </Card>
        </div>
      )}
    </Draggable>
  );
};

export default ActivityCard;

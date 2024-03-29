import React, { useState } from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Card, CardContent, Grid, TextField, Typography } from '@mui/material';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { useTheme } from '@emotion/react';
import { tokens } from '../../../theme';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import { format } from "date-fns";
import { DesktopTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

const cardColors = {leisure: '#FFCACC', catering: '#FFCF96', travel: '#D2E0FB', other: '#fff'};

const ActivityCard = ({ item, index, deleteActivityById, editActivityById, day }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [isEditingText, setIsEditingText] = useState(false);
  const [text, setText] = useState(item.activity);
  const [isEditingTime, setIsEditingTime] = useState(false);


  // Handle activity text editing
  const handleTextClick = () => {
    setIsEditingText(true);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  // Handle activity time editing
  const handleTimeClick = () => {
    setIsEditingTime(true);
  };

  const handleTextBlur = (day, id, time) => {
    setIsEditingText(false);
    setIsEditingTime(false);

    editActivityById(day, id, text, time);
  };



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
              maxWidth: '311px',
              backgroundColor: item.activityType ? cardColors[item.activityType] : ''
          }}>

          

            <CardContent sx={{paddingBottom: "10px !important"}} >
              <Grid container spacing={2} >
                <Grid item xs={11}>

                {isEditingText ? (
                  <TextField
                    value={text}
                    onChange={handleTextChange}
                    onBlur={()=>handleTextBlur(day, item.id, item.start?.toDate())}
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
                  <Typography variant="body2" onClick={handleTextClick} sx={{ cursor: 'pointer' }}>
                    {item.activity}
                  </Typography>
                )}


                </Grid>
                <Grid item xs={1}>
                  <DeleteForeverOutlinedIcon fontSize='1.7rem' sx={{'color': colors.greenAccent[400]}} onClick={()=>deleteActivityById(day, item.id)}/>
                </Grid>
              </Grid>

              { (item.start  && isEditingTime) &&
                (<Grid container spacing={2}>
                  <Grid item xs={12}>

                    <DesktopTimePicker
                      margin="normal"
                      id="startTime"
                      name="startTime"
                      label="Hora de comienzo"
                      value={dayjs(item.start.toDate())}                
                      onAccept={(newValue)=>handleTextBlur(day, item.id, newValue)}
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

                  </Grid>
                </Grid>)
              }

              { (item.start  && !isEditingTime) &&
                (<Grid container spacing={2}>
                  <Grid item xs={12} sx={{'display': 'flex', 'alignItems': 'center'}}>
                    <AccessTimeOutlinedIcon sx={{'fontSize': '1rem', 'marginRight': '5px', 'color': colors.greenAccent[400]}} />
                    <Typography variant="caption" color={colors.greenAccent[400]} onClick={handleTimeClick} sx={{ cursor: 'pointer' }}>
                      {format(item.start.toDate(), "HH:mm")}
                    </Typography>
                  </Grid>
                </Grid>)
              }

            </CardContent>
          </Card>
        </div>
      )}
    </Draggable>
  );
};

export default ActivityCard;

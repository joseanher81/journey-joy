import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { formatActivitiesForBoard, formatActivitiesForFirebase } from '../../../helpers/formatActivities';
import { useFirestore } from '../../../hooks/useFirestore';
import { Box, Button, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ActivityModal from './ActivityModal';
import ActivityCard from './ActivityCard';
import { useTheme } from '@emotion/react';
import { tokens } from '../../../theme';
import {useSnackBarContext} from '../../../hooks/useSnackBarContext';
import { timestamp } from '../../../firebase/config';

const Container = styled.div`
  display: flex;
  overflow-x: auto;
  max-width: 90vw;
  padding-left: 20px;
  padding-bottom: 30px;
  margin-left: 10px;
`;

const ActivitiesList = styled.div`
  min-height: 100px;
  ${'' /* max-height: 70%; */}
  display: flex;
  flex-direction: column;
  background: #f3f3f3;
  min-width: 341px;
  border-radius: 5px;
  padding: 15px 15px;
  margin-right: 45px;
`;

const ActivitiesColumnStyles = styled.div`
  margin: 8px;
  margin-top: 5vh;
  display: flex;
  justify-content: center;
  ${'' /* width: 100%; */}
  min-height: 50vh;
`;

const Title = styled.span`
  color: #10957d;
  background: rgba(16, 149, 125, 0.15);
  padding: 2px 10px;
  border-radius: 5px;
  align-self: flex-start;
`;

const DaysBoard = ({trip}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {showSnack} = useSnackBarContext();

  console.log('a ver', formatActivitiesForBoard(trip))
  const [columns, setColumns] = useState(formatActivitiesForBoard(trip));
  const { updateDocument, response } = useFirestore('trips');

  // Listens to changes in the board
  const [hasChanged, setHasChanged] = useState(false);

  // Activity modal
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = (id) => {
    
    if(trip.days[id].length >= 5) { // This limits the number of activities per day to 5
      showSnack('There can be only a max of 5 activities per day!', 'warning');
      return;
    }
    // Adding activities allowed
    setDayId(id)
    setOpenModal(true);
  }
  const handleCloseModal = () => setOpenModal(false);
  const [dayId, setDayId] = useState(null);

  
  // This adds a new activity to the corresponding column day
  const handleAddActivity = async(activity, start) => {
    setOpenModal(false);

    const pos = trip.days[dayId].length;
    const update = {[`days.${dayId}`]: [...trip.days[dayId], {pos, activity, start: start ? timestamp.fromDate(new Date(start)) : null}]}

    await updateDocument(trip.id, update);

    // Show success snackbar
    if(!response.error) showSnack('New activity added!', 'success');
  }

  // This saves in Firestore new order of activity
  useEffect(() => {
    const updateFirestore = async() => { 
      if(hasChanged) {   
        const update = formatActivitiesForFirebase(columns)

        await updateDocument(trip.id, update);
        setHasChanged(false);   
      }
    }

    updateFirestore();
  }, [columns]);

  // Update activities on list
  useEffect(() => {
    setColumns(formatActivitiesForBoard(trip));
  }, [trip]);

  // Deletes an activity based on day and id
  const deleteActivityById = (day, id) => {
    console.log('deleting', day, id)
    // Clone the columns object to avoid direct modification
    const newColumns = { ...columns };
  
    // Check if the day exists in the columns and has an "items" property that is an array
    if (newColumns.hasOwnProperty(day) && newColumns[day].hasOwnProperty("items") && Array.isArray(newColumns[day].items)) {
      // Filter the elements of the "items" array in the given day to remove the one with the given "id"
      newColumns[day].items = newColumns[day].items.filter((item) => item.id !== id);
    }
  
    // Set the new columns with the removed item
    setHasChanged(true);   
    setColumns(newColumns);
  }

  // Edits an activity based on day and id
  const editActivityById = (day, id, text) => {
    // Clone the columns object to avoid direct modification
    const newColumns = { ...columns };

    console.log('editing', day, id, text)

    // Check if the day exists in the columns and has an "items" property that is an array
    if (newColumns.hasOwnProperty(day) && newColumns[day].hasOwnProperty("items") && Array.isArray(newColumns[day].items)) {
      // Map the elements of the "items" array in the given day to modify the one with the given "id"
      newColumns[day].items = newColumns[day].items.map((item) => {
        if(item.id === id) {
          item.activity = text;
          return item;
        }
        return item;
      });
    }

    console.log('new columns', newColumns)

    // Set the new columns with the modified item
    setHasChanged(true);   
    setColumns(newColumns);
  }

  // Reorder de activity items when dragged and dropped in new location
  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) { // Different column
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
      setHasChanged(true);
    } else { // Same column
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      console.log('copied', copiedItems)
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
      setHasChanged(true);
    }
  };
  return (
    <Box>
      <Typography variant="h2" sx={{marginLeft: '50px'}}>Actividades por Días</Typography>

      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        <Container className='activities'>
          <ActivitiesColumnStyles>
            {Object.entries(columns).map(([columnId, column], index) => {
              return (
                <Droppable key={columnId} droppableId={columnId}>
                  {(provided, snapshot) => (
                    <ActivitiesList
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      <Title>{column.title}</Title>
                      {column.items.map((item, index) => (
                        <ActivityCard key={item.id} item={item} index={index} day={column.title} deleteActivityById={deleteActivityById} editActivityById={editActivityById}/>
                      ))}
                      {provided.placeholder}
                      <Button 
                        onClick={() => handleOpenModal(columnId)}
                        variant="contained" 
                        startIcon={<AddCircleIcon />}
                        sx={{
                          marginTop: 'auto',
                          backgroundColor: colors.greenAccent[400]
                        }}
                      >
                        Añadir
                      </Button>

                      
                    </ActivitiesList>
                  )}
                </Droppable>
              );
            })}
          </ActivitiesColumnStyles>
        </Container>
      </DragDropContext>
      <ActivityModal openModal={openModal} handleCloseModal={handleCloseModal} handleAddActivity={handleAddActivity}/>
    </Box>
  );
};

export default DaysBoard;
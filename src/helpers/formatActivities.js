/* This function receives a trip and format its day activities
 in order to be consumed by react-beautiful-dnd logic */

export const formatActivities = (trip) => {

    const daysArr = trip.days;
    const columns = {}

    for(let i = 0; i< daysArr.length; i++) {
        columns[daysArr[i].id] = {title: daysArr[i].id,items: daysArr[i].activities.map(activity => ({id: activity, Task: activity}))};
    }

    console.log('COLUMNS',JSON.stringify(columns) );

    return columns;
}


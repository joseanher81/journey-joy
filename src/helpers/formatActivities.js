/* This function receives a trip and format its day activities
 in order to be consumed by react-beautiful-dnd logic */

export const formatActivitiesForBoard = (trip) => {

    const columns = {}

    const days = Object.keys(trip.days);
    
    days.forEach(day => {
        console.log('TRIPDAYS', day, trip.days[day])
        columns[day] = {title: day, items: trip.days[day].map( activity => ({id: `${day} - ${activity.pos}`, Task: activity.activity}))}
    });

    console.log(' UNSORTED COLUMNS',JSON.stringify(columns));
    console.log(' SORTED COLUMNS',JSON.stringify(sortDays(columns)));

    return sortDays(columns);
}

export const formatActivitiesForFirebase = (columns) => {
    const keys = Object.keys(columns);
  
    const result = {};
    keys.forEach( day => result[day] = columns[day].items.map( (act, index) => ({pos: index, activity: act.Task })));

    const update = {'days': result};

    return update;
}

const sortDays = (data) => {
    return Object.keys(data)
      .sort() // Ordena las claves alfabéticamente
      .reduce((acc, key) => {
        acc[key] = data[key];
        return acc;
      }, {})
  };
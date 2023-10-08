/* This function receives a trip and format its day activities
 in order to be consumed by react-beautiful-dnd logic */

export const formatActivitiesForBoard = (trip) => {

    const columns = {}

    const days = Object.keys(trip.days);
    
    days.forEach(day => {
        columns[day] = {title: day, items: trip.days[day].map( activity => ({id: `${day} - ${activity.pos}`, activity: activity.activity, start: activity.start}))}
    });

    return sortDays(columns);
}

export const formatActivitiesForFirebase = (columns) => {
    const keys = Object.keys(columns);
  
    const result = {};
    keys.forEach( day => result[day] = columns[day].items.map( (act, index) => ({pos: index, activity: act.activity, start: act.start })));

    const update = {'days': result};
    
    return update;
}

export const createActivityDays = (days) => {
    const result = {};
    for(let i = 1; i <= days; i++) {
        result['Day - '+i] = [];
    }
    
    return result;
}

const sortDays = (data) => {
    return Object.keys(data)
      .sort() // Ordena las claves alfabéticamente
      .reduce((acc, key) => {
        acc[key] = data[key];
        return acc;
      }, {})
  };

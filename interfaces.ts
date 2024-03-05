import firebase from "firebase/compat/app";

// Trips props
export interface Companion {
    photoURL: string;
    displayName: string;
    id: string;
}
  
export interface Document {
    fileURL: string;
    text: string;
    type: "flight" | "train" | "car" | "ticket"; 
}
  
export interface Comment {
    createdAt: {
        seconds: number;
        nanoseconds: number;
    };
    photoURL: string;
    id: number;
    displayName: string;
    content: string;
}
  
export interface Day {
    activity: string;
    activityType: "travel" | "catering" | "leisure" | "other";
    start: {
        seconds: number;
        nanoseconds: number;
    } | null;
    pos: number;
}
  
export interface Days {
    [day: string]: Day[];
}
  
export interface Trip{
    startDate: firebase.firestore.Timestamp;
    country: string;
    title: string;
    ISO: string;
    endDate: firebase.firestore.Timestamp;
    pictureUrl: string;
    documents: Document[];
    companions: Companion[];
    comments: Comment[]; 
    createdBy: string;
    place: string;
    description: string;
    travelDuration: number;
    days: Days;
    id: string;
}
  
export interface TripsBlockProps {
    user: {
      displayName: string,
      online?: boolean,
      photoURL: string,
      theme: string
    },
    title: string,
    future?: boolean,
    trips?: Trip[] 
}

export interface TripsListProps {
    trips: Trip[]
}

// Overview props
export interface GeoMapProps {
    isDashboard?: boolean;
    mapData:  Array<{
      id: string;
      value: any;
    }>;
}

export interface StatsProps {
    countriesVisited: number;
    daysTraveled: number;
    mostVisitedCountry: string;
    numberOfTrips: number;
    companions: Array<{
        id: string,
        photoURL: string,
        displayName: string
    }>;
}

// Dashboard props
export interface DashboardPageProps {
    searchQuery: string,
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>
}
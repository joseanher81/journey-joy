import { useAuthContext } from "../../hooks/useAuthContext";
import { useEffect, useState } from "react";
import { useTripsContext } from "../../hooks/useTripsContext";
import { isBefore, isAfter, isSameDay } from 'date-fns';
import TripsBlock from "./components/TripsBlock";
import { DashboardPageProps, Trip } from "../../../interfaces";

export default function DashboardPage(props: DashboardPageProps) {
  const {searchQuery, setSearchQuery} = props;

  const { tripsList }: { tripsList: Trip[] } = useTripsContext();

  const {user} = useAuthContext();

  const [trips, setTrips] = useState<Trip[] | null>(null);
  const [pastTrips, setPastTrips] = useState<Trip[] | null>(null);

  // Clean search query on first time (MAYBE THIS COULD BE SOLVED IN A BETTER WAY)
  useEffect(()=> {
    setSearchQuery('');
  }, []);

  // Update trip list according to search on topbar
  useEffect(() => {
    if(tripsList) {
      const filtered = tripsList.filter(doc => {
        return doc.title.toLowerCase().includes(searchQuery) || doc.place.toLowerCase().includes(searchQuery)
      });

      // Split trips into past and future lists
      const today = new Date();

      const future = filtered.filter(doc => isAfter(doc.endDate.toDate(), today) || isSameDay(doc.endDate.toDate(), today));
      setTrips(future);

      const past = filtered.filter(doc => isBefore(doc.endDate.toDate(), today) && !isSameDay(doc.endDate.toDate(), today));
      setPastTrips(past.reverse()); //Display first the recent ones
    }
  }, [searchQuery, tripsList]);

  return (
    <main>
      {/* No trips */}
      {(!trips || trips?.length === 0) && <TripsBlock user={user} title="No hay viajes" />}

      {/* Future trips */}
      {(trips && trips?.length >0) && <TripsBlock user={user} title="Mis viajes" future={true} trips={trips}/>}

      {/* Past trips */}
      {(pastTrips && pastTrips?.length >0) && <TripsBlock user={user} title="Viajes pasados" future={false} trips={pastTrips}/>}
      
    </main>
  )
}

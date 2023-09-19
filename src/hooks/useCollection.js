import { useEffect, useRef, useState } from "react"
import { db } from "../firebase/config";
import { collection, onSnapshot, query, where, orderBy } from "firebase/firestore";




export const useCollection = (col, _query, _orderBy) => {

    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);

    const q = useRef(_query).current; // Avoids infite loop since it is a dependency of useEffect and an array
    const order = useRef(_orderBy).current; // Avoids infite loop since it is a dependency of useEffect and an array

    useEffect(() => {
        // Referencia a la colección
        let collectionRef = collection(db, col);

        if(_query) {
            // Crea una consulta que incluye el filtro
            collectionRef = query(collectionRef, where(...q));
        }

        if(_orderBy) {
            // Crea una consulta que incluye el orden
            collectionRef = query(collectionRef, orderBy(...order));
        }

        // Subscripcion
        const unsub = onSnapshot(collectionRef, (snapshot) =>{
            let results = [];
            snapshot.docs.forEach( doc => {
                results.push({ ...doc.data(), id: doc.id });
            })
            setDocuments(results);
            console.log('r',results)
        });

        return () => unsub();
    },[col, q])


    return { documents, error }
}

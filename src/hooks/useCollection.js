import { useEffect, useRef, useState } from "react"
import { db } from "../firebase/config";
import { collection, onSnapshot, query, where, or, orderBy } from "firebase/firestore";




export const useCollection = (col, _query, _orderBy) => {

    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);

    const q = useRef(_query).current; // Avoids infite loop since it is a dependency of useEffect and an array
    const order = useRef(_orderBy).current; // Avoids infite loop since it is a dependency of useEffect and an array

    useEffect(() => {
        // Referencia a la colección
        let collectionRef = collection(db, col);
        console.log('Q', q)
        if(q) {
            if(q.length === 1) { // Single query
                console.log('consulta sencilla');
                // Crea una consulta que incluye el filtro
                collectionRef = query(collectionRef, where(q[0].field, q[0].operator, q[0].value));

            } else { // Complex query
                console.log('consulta compleja');
                // Crea una consulta que incluye el filtro
                collectionRef = query(collectionRef,  
                    or(where(q[0].field, q[0].operator, q[0].value),
                       where(q[1].field, q[1].operator, q[1].value)
                    )
                  );
            } 
        }

        if(order) {
            // Crea una consulta que incluye el orden
            collectionRef = query(collectionRef, orderBy(order));
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

export const useCollectionComplexQuery = (col, _query, _orderBy) => {

    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);

    const q = useRef(_query).current; // Avoids infite loop since it is a dependency of useEffect and an array
    const order = useRef(_orderBy).current; // Avoids infite loop since it is a dependency of useEffect and an array

    useEffect(() => {
        // Referencia a la colección
        let collectionRef = collection(db, col);
        console.log('entra')
        
        if(q) {
            if(q.length === 1) { // Single query
                console.log('consulta sencilla');
                // Crea una consulta que incluye el filtro
                collectionRef = query(collectionRef, where(q[0].field, q[0].operator, q[0].value));

            } else { // Complex query
                console.log('consulta compleja');
                // Crea una consulta que incluye el filtro
                collectionRef = query(collectionRef,  
                    or(where(q[0].field, q[0].operator, q[0].value),
                       where(q[1].field, q[1].operator, q[1].value)
                    )
                  );
            } 
        }

        if(order) {
            // Crea una consulta que incluye el orden
            collectionRef = query(collectionRef, orderBy(order));
        }
        console.log('colref', collectionRef)
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

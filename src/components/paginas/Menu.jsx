import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FirebaseContext } from '../../firebase';

import Platillo from '../common-ui/Platillo';

const Menu = () => {

    const [platillos, setPlatillos] = useState([]);

    const { firebase } = useContext(FirebaseContext);

    useEffect(() => {
        const obtenerPlatillos = () => {
            firebase.db.collection('productos').onSnapshot(handleSnapshot);
        }
        obtenerPlatillos();
    }, []);

    // Snapshot permite utilizar la base de datos en tiempo real de firestore
    const handleSnapshot = (snapshot) => {
        const platillos = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        });

        setPlatillos(platillos);

    }

    return ( 
        <>
            <h1 className='text-5xl font-light mb-4'>Menu Screen</h1>
            <Link to="/nuevo-platillo" className="bg-indigo-900 hover:bg-yellow-500 hover:text-gray-900 inline-block mb-5 p-3 text-white font-bold">Agregar platillo</Link>
        
            {platillos.map(platillo => (
                <Platillo
                    key={platillo.id}
                    platillo={platillo}
                />
            ))}
            
        
        </>
     );
}
 
export default Menu;
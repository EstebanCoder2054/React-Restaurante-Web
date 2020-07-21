import React, { useEffect, useContext, useState } from 'react';
import { FirebaseContext } from '../../firebase';
import Orden from '../common-ui/Orden';

const Ordenes = () => {

    // context de las operaciones de firebase
    const { firebase } = useContext(FirebaseContext);

    // state con las ordenes
    const [ordenes, setOrdenes] = useState([]);

    useEffect(() => {
        const obtenerOrdenes = () => {
            firebase.db.collection('ordenes').where('completado', '==', false).onSnapshot(manejarSnapshot);
        }
        obtenerOrdenes();
    }, [])

    const manejarSnapshot = (snapshot) => {
        const ordenes = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        });

        setOrdenes(ordenes);
    }

    return ( 
        <>
            <h1 className='text-5xl font-light mb-4'>Administra tus órdenes 🤑</h1>
            <div className="sm:flex sm:flex-wrap -mx-3">
                {ordenes.length > 0 ? 
                    ordenes.map(orden => (
                        <Orden
                            key={orden.id}
                            orden={orden}
                        />
                    ))
                 : (
                    <>
                        <div className="justify-center bg-blue-200 w-full">
                            <h1 style={{color: '#3c366b'}} className="text-center text-4xl">
                                Aún no hay pedidos 😢
                            </h1>
                        </div>
                    </>
                )}
            
            </div>
        </>
     );
}
 
export default Ordenes;
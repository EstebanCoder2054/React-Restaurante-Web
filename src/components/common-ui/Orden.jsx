import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../../firebase';

const Orden = ({orden}) => {

    const [tiempoentrega, setTiempoentrega] = useState(0);

    //context de firebase
    const { firebase } = useContext(FirebaseContext);

    // define el tiempo de entrega en tiempo real a firebase
    const definirTiempo = (id) => {
        try {
            firebase.db.collection('ordenes')
                        .doc(id)
                        .update({
                            tiempoentrega
                        })
        } catch (error) {
            console.log(error);
        }
    }

    // completa el estado de una orden
    const completarOrden = (id) => {
        try {
            firebase.db.collection('ordenes')
                        .doc(id)
                        .update({
                            completado: true
                        })
        } catch (error) {
            console.log(error);
        }
    }

    return ( 
        <div className="sm:w-1/2 lg:w-1/3 px-2 mb-4">
            <div className="p-3 shadow-md bg-white">
                <h1 className="text-yellow-500 text-lg font-bold"> {orden.id} </h1>
                {orden.orden.map(platillo => (
                    <p className="text-gray-600">{platillo.cantidad} - {platillo.nombre}</p>
                ))}

                <p className="text-gray-700 font-bold">Total a pagar: {orden.total} $</p>

                {orden.tiempoentrega === 0 && (
                    <div className="mb-4">
                        <label htmlFor="tiempoentrega" className="block text-gray-700 text-sm font-bold mb-2">
                            Tiempo de entrega <span className="text-sm text-gray-500">(minutos)</span>
                        </label>
                        <input
                            id='tiempoentrega'
                            name='tiempoentrega'
                            type='number'
                            value={tiempoentrega}
                            onChange={e => setTiempoentrega( parseInt(e.target.value))} 
                            min='1'
                            max='60'
                            placeholder='ej. 15'
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />

                        <button
                            onClick={ () => definirTiempo(orden.id) }
                            type="submit"
                            className="bg-indigo-900 hover:bg-yellow-500 text-white hover:text-indigo-900 w-full mt-5 p-2 uppercase font-bold"
                        >
                            Definir tiempo de entrega
                        </button>
                    </div>
                )}

                {orden.tiempoentrega > 0 && (
                    <p className="text-gray-700">
                        Tiempo de entrega
                        <span className="font-bold"> {orden.tiempoentrega} </span>
                        minutos
                    </p>
                )}

                {!orden.completado && orden.tiempoentrega > 0 && (
                    <button
                        onClick={ () => completarOrden(orden.id) }
                        type='button'
                        className="bg-green-500 hover:bg-green-700 w-full mt-5 p-2 text-white uppercase font-bold"
                    >
                        ¡Ya está lista!
                    </button>
                )}



            </div>
        </div>
     );
}
 
export default Orden;